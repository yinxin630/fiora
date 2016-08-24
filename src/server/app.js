'use strict'

let env = process.env.NODE_ENV;

const config = require('../../config/config');
const mongoose = require('mongoose');
const promise = require('bluebird');
const path = require('path');
const fs = require('fs');
const koa = require('koa');
const send = require('koa-send');
const app = koa();

// support socket.io
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);
io.set('heartbeat interval', 5000);
io.set('heartbeat timeout', 3000);

const router = require('./route/index');

// use native Promise
mongoose.Promise = global.Promise;

// connect database
mongoose.connect(env !== 'test' ? config.database : config.testDatabase, err => {
    if (err) {
        console.log('connect database error -->', err);
        process.exit(1);
    }
    if (env === 'test') {
        mongoose.connection.db.dropDatabase();
    }
    console.log('connect database success');
    // clear old auth record
    require('./model/auth').remove({}, () => {
        console.log('remove all old auth');
    });
    // create default group
    const Group = require('./model/group');
    Group.find({ }, (err, groups) => {
        if (groups.length === 0) {
            let defaultGroup = new Group({
                name: 'fiora',
                announcement: '欢迎各位来到fiora',
                isDefault: true
            });
            defaultGroup.save((err, result) => {
                console.log('create default group success');
            });
        }
    });
});

// import all routers
fs.readdir(__dirname + '/route', (err, result) => {
    for (let file of result) {
        if (file !== 'index.js') {
            let routers = require('./route/' + file);
            for (let path in routers) {
                router[path] = promise.coroutine(routers[path]);
            }
        }
    }
});

// support request log
if (env !== 'test') {
    app.use(require('koa-logger')());
}

// mapping front end route to index file
// app.use(function* (next){
//     if (this.path.match(/\./) === null) {
//         console.log('---> ', this.path, path.join(__dirname, 'util/a.html'));
//         yield send(this, path.join(__dirname, 'util/a.html'), {
//                 maxage: 1000 * 60 * 60 * 24,
//                 gzip: true,
//             }
//         );
//     }
//     else {
//         yield next;
//     }
// });

// support static file
app.use(require('koa-static')(
    path.join(__dirname, '../../public/'), {
        maxAge: 1000 * 60 * 60 * 24,
    }
));

// error handle
app.use(function* (next) {
    try {
        yield next;
    }
    catch (err) {
        let message = err.message;

        console.log('error --> ', message);
    }
});

// socket handle
io.on('connection', socket => {
    console.log('new connection');

    socket.on('message', (data, cb) => {
        router.handle(socket, data, cb);
    });

    socket.on('disconnect', () => {
        console.log('some one disconnect');
        router.handle(socket, { method: 'DELETE', path: '/auth', data: { } }, () => { });
    });
});

// start listener
server.listen(config.port, () => {
    console.log('start server at http://localhost:' + config.port);
});

// other error handle
server.on('error', err => {
    console.log('error --> ', err.message);
    process.exit(1);
});


module.exports = server;
'use strict'

let env = process.env.NODE_ENV;

const config = require('../../config/config.js');
const path = require('path');
const koa = require('koa');
const app = koa();

// support socket.io
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);

// support request log
if (env !== 'test')
    app.use(require('koa-logger')());

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
        console.log(data, cb);
        cb('abcd');
    });

    socket.on('disconnect', () => {
        console.log('some one disconnect');
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
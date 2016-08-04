'use strict'

let env = process.env.NODE_ENV;

const config = require('../../config/config.js');
const path = require('path');
const koa = require('koa.io');
const app = koa();

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
})

app.io.use(function* (next) {
    console.log('connected');
    yield* next;
    console.log('disconnected');
});

// start listener
app.listen(config.port, () => {
    console.log('start server at http://localhost:' + config.port);
});

// other error handle
app.on('error', err => {
    console.log('error --> ', err.message);
    process.exit(1);
});


module.exports = app;
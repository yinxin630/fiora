const Koa = require('koa');
const IO = require('koa-socket');
const koaSend = require('koa-send');
const koaStatic = require('koa-static');
const path = require('path');

const enhanceContext = require('./middlewares/enhanceContext.js');
const log = require('./middlewares/log');
const catchError = require('./middlewares/catchError');
const seal = require('./middlewares/seal');
const frequency = require('./middlewares/frequency');
const isLogin = require('./middlewares/isLogin');
const route = require('./middlewares/route');

const userRoutes = require('./routes/user');
const groupRoutes = require('./routes/group');
const messageRoutes = require('./routes/message');
const qiniuRoutes = require('./routes/qiniu');
const systemRoutes = require('./routes/system');

const Socket = require('./models/socket');

const config = require('../config/server');

const app = new Koa();

// 将前端路由指向 index.html
app.use(async (ctx, next) => {
    if (!/\./.test(ctx.request.url)) {
        await koaSend(
            ctx,
            'index.html',
            {
                root: path.join(__dirname, '../public'),
                maxage: 1000 * 60 * 60 * 24 * 7,
                gzip: true,
            } // eslint-disable-line
        );
    } else {
        await next();
    }
});


// 静态文件访问
app.use(koaStatic(
    path.join(__dirname, '../public'),
    {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        gzip: true,
    } // eslint-disable-line
));

const io = new IO({
    ioOptions: {
        pingTimeout: 10000,
        pingInterval: 5000,
    },
});

// 注入应用
io.attach(app);

if (process.env.NODE_ENV === 'production' && config.allowOrigin) {
    app._io.origins(config.allowOrigin);
}


// 中间件
io.use(enhanceContext());
io.use(log());
io.use(catchError());
io.use(seal());
io.use(frequency());
io.use(isLogin());
io.use(route(
    app.io,
    app._io,
    Object.assign({}, userRoutes, groupRoutes, messageRoutes, qiniuRoutes, systemRoutes),
));

app.io.on('connection', async (ctx) => {
    console.log(`  <<<< connection ${ctx.socket.id} ${ctx.socket.request.connection.remoteAddress}`);
    await Socket.create({
        id: ctx.socket.id,
        ip: ctx.socket.request.connection.remoteAddress,
    });
});
app.io.on('disconnect', async (ctx) => {
    console.log(`  >>>> disconnect ${ctx.socket.id}`);
    await Socket.remove({
        id: ctx.socket.id,
    });
});

module.exports = app;

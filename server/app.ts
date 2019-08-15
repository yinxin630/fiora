import Socket from './models/socket';

import config from '../config/server';

const Koa = require('koa');
const IO = require('koa-socket-2');
const koaSend = require('koa-send');
const koaStatic = require('koa-static');
const path = require('path');

const enhanceContext = require('./middlewares/enhanceContext');
const log = require('./middlewares/log');
const catchError = require('./middlewares/catchError');
const seal = require('./middlewares/seal');
const frequency = require('./middlewares/frequency');
const isLogin = require('./middlewares/isLogin');
const route = require('./middlewares/route');
const isAdmin = require('./middlewares/isAdmin');

const userRoutes = require('./routes/user');
const groupRoutes = require('./routes/group');
const messageRoutes = require('./routes/message');
const qiniuRoutes = require('./routes/qiniu');
const systemRoutes = require('./routes/system');

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
io.use(isAdmin());
io.use(route(
    app.io,
    app._io,
    {
        ...userRoutes, ...groupRoutes, ...messageRoutes, ...qiniuRoutes, ...systemRoutes,
    },
));

app.io.on('connection', async (ctx) => {
    console.log(`  <<<< connection ${ctx.socket.id} ${ctx.socket.request.connection.remoteAddress}`);
    await Socket.create({
        id: ctx.socket.id,
        ip: ctx.socket.request.connection.remoteAddress,
    });

    ctx.socket.on('disconnect', async () => {
        console.log(`  >>>> disconnect ${ctx.socket.id}`);
        await Socket.deleteOne({
            id: ctx.socket.id,
        });
    });
});

export default app;

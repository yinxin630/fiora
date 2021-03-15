import Koa from 'koa';
import IO from 'koa-socket-2';
import koaSend from 'koa-send';
import koaStatic from 'koa-static';
import path from 'path';

import Socket, { SocketDocument } from './models/socket';
import config from '../config/server';

import enhanceContext from './middlewares/enhanceContext';
import log from './middlewares/log';
import catchError from './middlewares/catchError';
import seal from './middlewares/seal';
import frequency from './middlewares/frequency';
import isLogin from './middlewares/isLogin';
import route from './middlewares/route';
import isAdmin from './middlewares/isAdmin';

import * as userRoutes from './routes/user';
import * as groupRoutes from './routes/group';
import * as messageRoutes from './routes/message';
import * as qiniuRoutes from './routes/qiniu';
import * as systemRoutes from './routes/system';
import * as notificationRoutes from './routes/notification';
import * as historyRoutes from './routes/history';

const app = new Koa();
app.proxy = true;

// 将前端路由指向 index.html
app.use(async (ctx, next) => {
    if (
        /\/invite\/group\/[\w\d]+/.test(ctx.request.url) ||
        !/(\.)|(\/invite\/group\/[\w\d]+)/.test(ctx.request.url)
    ) {
        await koaSend(
            ctx,
            'index.html',
            {
                root: path.join(__dirname, '../public'),
                maxage: 1000 * 60 * 60 * 24 * 7,
                gzip: true,
            }, // eslint-disable-line
        );
    } else {
        await next();
    }
});

// 静态文件访问
app.use(
    koaStatic(
        path.join(__dirname, '../public'),
        {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            gzip: true,
        }, // eslint-disable-line
    ),
);

const io = new IO({
    ioOptions: {
        pingTimeout: 10000,
        pingInterval: 5000,
    },
});

// 注入应用
io.attach(app);

if (process.env.NODE_ENV === 'production' && config.allowOrigin) {
    // @ts-ignore
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

const routes = {
    ...userRoutes,
    ...groupRoutes,
    ...messageRoutes,
    ...qiniuRoutes,
    ...systemRoutes,
    ...notificationRoutes,
    ...historyRoutes,
};
Object.keys(routes).forEach(key => {
    if (key.startsWith('_')) {
        // @ts-ignore
        routes[key] = undefined;
    }
})
io.use(
    route(
        // @ts-ignore
        app.io,
        // @ts-ignore
        app._io,
        // @ts-ignore
        routes,
    ),
);

// @ts-ignore
app.io.on('connection', async (socket) => {
    socket.ip = socket.handshake.headers['x-real-ip'] || socket.request.connection.remoteAddress;
    console.log(`  <<<< connection ${socket.id} ${socket.ip}`);
    await Socket.create({
        id: socket.id,
        ip: socket.ip,
    } as SocketDocument);

    socket.on('disconnect', async () => {
        console.log(`  >>>> disconnect ${socket.id}`);
        await Socket.deleteOne({
            id: socket.id,
        });
    });
});

export default app;

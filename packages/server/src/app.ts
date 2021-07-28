import Koa from 'koa';
import koaSend from 'koa-send';
import koaStatic from 'koa-static';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';

import logger from '@fiora/utils/logger';
import config from '@fiora/config/server';
import { getSocketIp } from '@fiora/utils/socket';
import SocketModel, {
    SocketDocument,
} from '@fiora/database/mongoose/models/socket';

import seal from './middlewares/seal';
import frequency from './middlewares/frequency';
import isLogin from './middlewares/isLogin';
import isAdmin from './middlewares/isAdmin';

import * as userRoutes from './routes/user';
import * as groupRoutes from './routes/group';
import * as messageRoutes from './routes/message';
import * as systemRoutes from './routes/system';
import * as notificationRoutes from './routes/notification';
import * as historyRoutes from './routes/history';
import registerRoutes from './middlewares/registerRoutes';

const app = new Koa();
app.proxy = true;

const httpServer = http.createServer(app.callback());
const io = new Server(httpServer, {
    cors: {
        origin: config.allowOrigin || '*',
        credentials: true,
    },
    pingTimeout: 10000,
    pingInterval: 5000,
});

// serve index.html
app.use(async (ctx, next) => {
    if (
        /\/invite\/group\/[\w\d]+/.test(ctx.request.url) ||
        !/(\.)|(\/invite\/group\/[\w\d]+)/.test(ctx.request.url)
    ) {
        await koaSend(ctx, 'index.html', {
            root: path.join(__dirname, '../public'),
            maxage: 1000 * 60 * 60 * 24 * 7,
            gzip: true,
        });
    } else {
        await next();
    }
});

// serve public static files
app.use(
    koaStatic(path.join(__dirname, '../public'), {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        gzip: true,
    }),
);

const routes: Routes = {
    ...userRoutes,
    ...groupRoutes,
    ...messageRoutes,
    ...systemRoutes,
    ...notificationRoutes,
    ...historyRoutes,
};
Object.keys(routes).forEach((key) => {
    if (key.startsWith('_')) {
        routes[key] = null;
    }
});

io.on('connection', async (socket) => {
    const ip = getSocketIp(socket);
    logger.trace(`connection ${socket.id} ${ip}`);
    await SocketModel.create({
        id: socket.id,
        ip,
    } as SocketDocument);

    socket.on('disconnect', async () => {
        logger.trace(`disconnect ${socket.id}`);
        await SocketModel.deleteOne({
            id: socket.id,
        });
    });

    socket.use(seal(socket));
    socket.use(isLogin(socket));
    socket.use(isAdmin(socket));
    socket.use(frequency(socket));
    socket.use(registerRoutes(socket, routes));
});

export default httpServer;

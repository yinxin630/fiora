import assert from 'assert';
import { Socket } from '../../types/socket';
import logger from '../utils/logger';

export default function registerRoutes(socket: Socket, routes: Routes) {
    return async ([event, data, cb]: MiddlewareArgs) => {
        const route = routes[event];
        if (route) {
            try {
                const ctx: Context<any> = {
                    data,
                    socket: {
                        id: socket.id,
                        ip:
                            (socket.handshake.headers['x-real-ip'] as string) ||
                            socket.request.connection.remoteAddress ||
                            '',
                        get user() {
                            return socket.user;
                        },
                        set user(newUserId: string) {
                            socket.user = newUserId;
                        },
                        get isAdmin() {
                            return socket.isAdmin;
                        },
                        join: socket.join.bind(socket),
                        leave: socket.leave.bind(socket),
                        emit: (target, _event, _data) => {
                            socket.to(target).emit(_event, _data);
                        },
                    },
                };
                const before = Date.now();
                const res = await route(ctx);
                const after = Date.now();
                logger.info(
                    `[${event}]`,
                    after - before,
                    ctx.socket.id,
                    ctx.socket.user || 'null',
                    typeof res === 'string' ? res : 'null',
                );
                cb(res);
            } catch (err) {
                if (err instanceof assert.AssertionError) {
                    cb(err.message);
                } else {
                    logger.error(`[${event}]`, err.message);
                    cb(`Server Error: ${err.message}`);
                }
            }
        } else {
            cb(`Server Error: event [event] not exists`);
        }
    };
}

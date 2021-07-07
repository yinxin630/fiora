import { Socket } from '../../types/socket';
import { SealText } from '../../utils/const';
import { getSealIpKey, getSealUserKey, Redis } from '../redis';

/**
 * 拦截被封禁用户的请求
 */
export default function seal(socket: Socket) {
    return async ([, , cb]: MiddlewareArgs, next: MiddlewareNext) => {
        const ip =
            (socket.handshake.headers['x-real-ip'] as string) ||
            socket.request.connection.remoteAddress ||
            '';
        const isSealIp = await Redis.has(getSealIpKey(ip));
        const isSealUser = socket.user && await Redis.has(getSealUserKey(socket.user));

        if (isSealUser || isSealIp) {
            cb(SealText);
        } else {
            next();
        }
    };
}

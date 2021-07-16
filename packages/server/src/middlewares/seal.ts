import { SEAL_TEXT } from '@fiora/utils/const';
import { getSealIpKey, getSealUserKey, Redis } from '../database/redis';
import { getSocketIp } from '@fiora/utils/socket';
import { Socket } from 'socket.io';

/**
 * 拦截被封禁用户的请求
 */
export default function seal(socket: Socket) {
    return async ([, , cb]: MiddlewareArgs, next: MiddlewareNext) => {
        const ip = getSocketIp(socket);
        const isSealIp = await Redis.has(getSealIpKey(ip));
        const isSealUser = socket.data.user && (await Redis.has(getSealUserKey(socket.data.user)));

        if (isSealUser || isSealIp) {
            cb(SEAL_TEXT);
        } else {
            next();
        }
    };
}

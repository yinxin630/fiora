import { KoaContext } from '../../types/koa';
import { SealText } from '../../utils/const';
import { getSealIpKey, getSealUserKey, Redis } from '../redis';

/**
 * 拦截被封禁用户的请求
 */
export default function seal() {
    return async (ctx: KoaContext, next: Function) => {
        const isSealIp = await Redis.has(getSealIpKey(ctx.socket.ip));
        const isSealUser = await (ctx.socket.user &&
            Redis.has(getSealUserKey(ctx.socket.user.toString())));
        if (isSealUser || isSealIp) {
            ctx.res = SealText;
            return null;
        }

        return next();
    };
}

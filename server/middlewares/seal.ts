import { existMemoryData, MemoryDataStorageKey } from '../memoryData';
import { KoaContext } from '../../types/koa';
import { SealText } from '../../utils/const';
import { getSealIpKey, Redis } from '../redis';

/**
 * 拦截被封禁用户的请求
 */
export default function seal() {
    return async (ctx: KoaContext, next: Function) => {
        const isSealIp = await Redis.has(getSealIpKey(ctx.socket.ip));
        if (
            // 用户id是否在封禁名单
            (ctx.socket.user &&
                existMemoryData(MemoryDataStorageKey.SealUserList, ctx.socket.user.toString())) ||
            isSealIp
        ) {
            ctx.res = SealText;
            return null;
        }

        return next();
    };
}

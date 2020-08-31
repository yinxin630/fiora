import { existMemoryData, MemoryDataStorageKey } from '../memoryData';
import { KoaContext } from '../../types/koa';
import { SealText } from '../../utils/const';

/**
 * 拦截被封禁用户的请求
 */
export default function seal() {
    return async (ctx: KoaContext, next: Function) => {
        if (
            // 用户id是否在封禁名单
            (
                ctx.socket.user
                && existMemoryData(MemoryDataStorageKey.SealUserList, ctx.socket.user.toString())
            )
            // ip是否在封禁名单
            || existMemoryData(MemoryDataStorageKey.SealIpList, ctx.socket.ip)
        ) {
            ctx.res = SealText;
            return null;
        }

        return next();
    };
}

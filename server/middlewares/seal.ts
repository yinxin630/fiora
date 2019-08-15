import { existMemoryData, MemoryDataStorageKey } from '../memoryData';
import { KoaContext } from '../../types/koa';

const { SealText } = require('../../utils/const');

/**
 * 拦截被封禁用户的请求
 */
export default function seal() {
    return async (ctx: KoaContext, next: Function) => {
        if (
            ctx.socket.user
            && existMemoryData(MemoryDataStorageKey.SealList, ctx.socket.user.toString())
        ) {
            ctx.res = SealText;
            return null;
        }

        return next();
    };
}

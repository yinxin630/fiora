import { KoaContext } from '../../types/koa';
import logger from '../utils/logger';

/**
 * 打印请求日志
 */
export default function log() {
    return async (ctx: KoaContext, next: Function) => {
        if (ctx.event === 'disconnect') {
            return next();
        }

        const before = Date.now();
        await next();
        const after = Date.now();

        // 接口名 耗时 错误消息(如果失败了的话)
        logger.info(
            `[${ctx.event}]`,
            after - before,
            ctx.socket.id,
            ctx.socket.user || 'null',
            typeof ctx.res === 'string' ? ctx.res : 'null',
        );

        return null;
    };
}

import { KoaContext } from '../../types/koa';

/**
 * 增强context对象
 * 通过 socket 的 acknowledge 回调方法, 将 ctx.res 的数据返回给客户端
 */
export default function enhanceContext() {
    return async (ctx: KoaContext, next: Function) => {
        await next();
        /* istanbul ignore next */
        if (ctx.acknowledge) {
            ctx.acknowledge(ctx.res);
        }
    };
}

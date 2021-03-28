import { KoaContext } from '../../types/koa';

/**
 * 打印请求日志
 */
export default function log() {
    return async (ctx: KoaContext, next: Function) => {
        if (ctx.event === 'disconnect') {
            return next();
        }

        // 接口名 用户socketId 用户id
        console.log(`  <-- ${ctx.event}  ${ctx.socket.id} ${ctx.socket.user ? ctx.socket.user : ''}`);

        const before = Date.now();
        await next();
        const after = Date.now();

        // 接口名 耗时 错误消息(如果失败了的话)
        console.log(`  --> ${ctx.event}  ${after - before} ${typeof ctx.res === 'string' ? ctx.res : ''}`);

        return null;
    };
}

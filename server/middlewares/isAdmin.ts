import config from '../../config/server';
import { KoaContext } from '../../types/koa';

/**
 * 拦截非管理员用户请求需要管理员权限的接口
 */
export default function isAdmin() {
    const requireAdminEvent = new Set([
        'sealUser',
        'getSealList',
        'resetUserPassword',
        'setUserTag',
        'deleteMessage',
        'getUserIps',
        'sealIp',
        'getSealIpList',
    ]);
    return async (ctx: KoaContext, next: Function) => {
        if (
            requireAdminEvent.has(ctx.event)
            && ctx.socket.user.toString() !== config.administrator
        ) {
            ctx.res = '你不是管理员';
            return;
        }
        await next();
    };
}

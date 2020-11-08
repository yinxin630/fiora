import config from '../../config/server';
import { KoaContext } from '../../types/koa';
import client from '../../config/client';

export const YouAreNotAdministrator = '你不是管理员';

/**
 * 拦截非管理员用户请求需要管理员权限的接口
 */
export default function isAdmin() {
    const requireAdminEvent = new Set([
        'sealUser',
        'getSealList',
        'resetUserPassword',
        'setUserTag',
        'getUserIps',
        'sealIp',
        'getSealIpList',
    ]);
    return async (ctx: KoaContext, next: Function) => {
        const isAdminUser = ctx.socket.user && ctx.socket.user.toString() === config.administrator;
        const isAdminEvent = requireAdminEvent.has(ctx.event);
        const isDisableDeleteMessage = ctx.event === 'deleteMessage' && client.disableDeleteMessage;
        if (!isAdminUser && (isAdminEvent || isDisableDeleteMessage)) {
            ctx.res = YouAreNotAdministrator;
            return;
        }
        await next();
    };
}

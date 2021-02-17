import { KoaContext } from '../../types/koa';

export const NeedLogin = '请登录后再试';

/**
 * 拦截未登录用户请求需要登录态的接口
 */
export default function isLogin() {
    const noRequireLoginEvent = new Set([
        'register',
        'login',
        'loginByToken',
        'guest',
        'getDefaultGroupHistoryMessages',
        'getDefaultGroupOnlineMembers',
        'getBaiduToken',
        'getGroupBasicInfo',
    ]);
    return async (ctx: KoaContext, next: Function) => {
        if (!noRequireLoginEvent.has(ctx.event) && !ctx.socket.user) {
            ctx.res = NeedLogin;
            return;
        }
        await next();
    };
}

import { KoaContext } from '../../types/koa';

/**
 * 拦截未登录用户请求需要登录态的接口
 */
export default function isLogin() {
    const noUseLoginEvent = {
        register: true,
        login: true,
        loginByToken: true,
        guest: true,
        getDefaultGroupHistoryMessages: true,
        getDefaultGroupOnlineMembers: true,
        getBaiduToken: true,
    };
    return async (ctx: KoaContext, next: Function) => {
        if (!noUseLoginEvent[ctx.event] && !ctx.socket.user) {
            ctx.res = '请登录后再试';
            return;
        }
        await next();
    };
}

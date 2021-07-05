import { Socket } from '../../types/socket';

export const NeedLogin = '请登录后再试';

/**
 * 拦截未登录用户请求需要登录态的接口
 */
export default function isLogin(socket: Socket) {
    const noRequireLoginEvent = new Set([
        'register',
        'login',
        'loginByToken',
        'guest',
        'getDefaultGroupHistoryMessages',
        'getDefaultGroupOnlineMembers',
        'getBaiduToken',
        'getGroupBasicInfo',
        'getSTS',
    ]);
    return async ([event, , cb]: MiddlewareArgs, next: MiddlewareNext) => {
        if (!noRequireLoginEvent.has(event) && !socket.user) {
            cb(NeedLogin);
        } else {
            next();
        }
    };
}

import config from '../../config/server';
import { KoaContext } from '../../types/koa';

/**
 * 拦截非管理员用户请求需要管理员权限的接口
 */
export default function isAdmin() {
    /**
     * 需要管理员权限的接口
     */
    const adminEvent = {
        sealUser: true,
        getSealList: true,
        resetUserPassword: true,
        setUserTag: true,
        deleteMessage: true,
        getUserIps: true,
    };
    return async (ctx: KoaContext, next: Function) => {
        if (
            adminEvent[ctx.event]
                && ctx.socket.user.toString() !== config.administrator
        ) {
            ctx.res = '你不是管理员';
            return;
        }
        await next();
    };
}

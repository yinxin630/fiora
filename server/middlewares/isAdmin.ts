import config from '../../config/server';
import { Socket } from '../../types/socket';

export const YouAreNotAdministrator = '你不是管理员';

/**
 * 拦截非管理员用户请求需要管理员权限的接口
 */
export default function isAdmin(socket: Socket) {
    const requireAdminEvent = new Set([
        'sealUser',
        'getSealList',
        'resetUserPassword',
        'setUserTag',
        'getUserIps',
        'sealIp',
        'getSealIpList',
    ]);
    return async ([event, , cb]: MiddlewareArgs, next: MiddlewareNext) => {
        socket.isAdmin = !!socket.user && config.administrator.includes(socket.user);
        const isAdminEvent = requireAdminEvent.has(event);
        if (!socket.isAdmin && isAdminEvent) {
            cb(YouAreNotAdministrator);
        } else {
            next();
        }
    };
}

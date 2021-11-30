import config from '@fiora/config/server';
import { Socket } from 'socket.io';

export const YOU_ARE_NOT_ADMINISTRATOR = '你不是管理员';

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
        'toggleSendMessage',
        'toggleNewUserSendMessage',
        'getSystemConfig',
    ]);
    return async ([event, , cb]: MiddlewareArgs, next: MiddlewareNext) => {
        socket.data.isAdmin =
            !!socket.data.user &&
            config.administrator.includes(socket.data.user);
        const isAdminEvent = requireAdminEvent.has(event);
        if (!socket.data.isAdmin && isAdminEvent) {
            cb(YOU_ARE_NOT_ADMINISTRATOR);
        } else {
            next();
        }
    };
}

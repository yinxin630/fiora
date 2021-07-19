import { Socket } from 'socket.io';
import { getNewUserKey, Redis } from '@fiora/database/redis/initRedis';

export const CALL_SERVICE_FREQUENTLY = '接口调用频繁, 请稍后再试';
export const NEW_USER_CALL_SERVICE_FREQUENTLY = '接口调用失败, 你正处于萌新限制期, 请不要频繁操作';

const MaxCallPerMinutes = 20;
const NewUserMaxCallPerMinutes = 5;
const ClearDataInterval = 60000;

type Options = {
    maxCallPerMinutes?: number;
    newUserMaxCallPerMinutes?: number;
    clearDataInterval?: number;
};

/**
 * 限制接口调用频率
 * 新用户限制每分钟5次, 老用户限制每分钟20次
 */
export default function frequency(
    socket: Socket,
    {
        maxCallPerMinutes = MaxCallPerMinutes,
        newUserMaxCallPerMinutes = NewUserMaxCallPerMinutes,
        clearDataInterval = ClearDataInterval,
    }: Options = {},
) {
    let callTimes: Record<string, number> = {};

    // 每60s清空一次次数统计
    setInterval(() => {
        callTimes = {};
    }, clearDataInterval);

    return async ([event, , cb]: MiddlewareArgs, next: MiddlewareNext) => {
        if (event !== 'sendMessage') {
            next();
        } else {
            const socketId = socket.id;
            const count = callTimes[socketId] || 0;

            const isNewUser = socket.data.user && (await Redis.has(getNewUserKey(socket.data.user)));
            if (isNewUser && count >= newUserMaxCallPerMinutes) {
                // new user limit
                cb('接口调用失败, 你正处于萌新限制期, 请不要频繁操作');
            } else if (count >= maxCallPerMinutes) {
                // normal user limit
                cb(CALL_SERVICE_FREQUENTLY);
            } else {
                callTimes[socketId] = count + 1;
                next();
            }
        }
    };
}

import { existMemoryData, MemoryDataStorageKey } from '../memoryData';

const MaxCallPerMinutes = 20;
/**
 * Limiting the frequency of interface calls
 */
module.exports = function frequency() {
    let callTimes = {};
    setInterval(() => {
        callTimes = {};
    }, 60000); // Emptying every 60 seconds

    return async (ctx, next) => {
        const { user } = ctx.socket;
        // robot10
        if (user && user.toString() === '5adad39555703565e7903f79') {
            return next();
        }

        const socketId = ctx.socket.id;
        const count = callTimes[socketId] || 0;

        // 萌新限制
        if (
            user
            && existMemoryData(MemoryDataStorageKey.NewUserList, user.toString())
            && count > 5
        ) {
            ctx.res = '接口调用失败, 你正处于萌新限制期, 请不要频繁操作';
            return null;
        }
        // 普通用户限制
        if (count > MaxCallPerMinutes) {
            ctx.res = '接口调用频繁, 请稍后再试';
            return null;
        }
        callTimes[socketId] = count + 1;
        return next();
    };
};

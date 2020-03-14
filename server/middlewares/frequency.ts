import { existMemoryData, MemoryDataStorageKey } from '../memoryData';
import { KoaContext } from '../../types/koa';

const MaxCallPerMinutes = 20;
const NewUserMaxCallPerMinutes = 5;

/**
 * 限制接口调用频率
 * 新用户限制每分钟5次, 老用户限制每分钟20次
 */
export default function frequency() {
    let callTimes: {[socketId: string]: number} = {};

    // 每60s清空一次次数统计
    setInterval(() => {
        callTimes = {};
    }, 60000);

    return async (ctx: KoaContext, next: Function) => {
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
            && count > NewUserMaxCallPerMinutes
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
}

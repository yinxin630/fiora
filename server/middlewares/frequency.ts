import { KoaContext } from '../../types/koa';
import { getNewUserKey, Redis } from '../redis';

export const CallServiceFrequently = '接口调用频繁, 请稍后再试';
export const NewUserCallServiceFrequently = '接口调用失败, 你正处于萌新限制期, 请不要频繁操作';

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
export default function frequency({
    maxCallPerMinutes = MaxCallPerMinutes,
    newUserMaxCallPerMinutes = NewUserMaxCallPerMinutes,
    clearDataInterval = ClearDataInterval,
}: Options = {}) {
    let callTimes: { [socketId: string]: number } = {};

    // 每60s清空一次次数统计
    setInterval(() => {
        callTimes = {};
    }, clearDataInterval);

    return async (ctx: KoaContext, next: Function) => {
        if (ctx.event !== 'sendMessage') {
            return next();
        }

        const { user } = ctx.socket;

        // robot10
        /* istanbul ignore next */
        if (user && user.toString() === '5adad39555703565e7903f79') {
            return next();
        }

        const socketId = ctx.socket.id;
        const count = callTimes[socketId] || 0;

        // 萌新限制
        const isNewUser = await (user && Redis.has(getNewUserKey(user.toString())));
        if (isNewUser && count >= newUserMaxCallPerMinutes) {
            ctx.res = '接口调用失败, 你正处于萌新限制期, 请不要频繁操作';
            return null;
        }

        // 普通用户限制
        if (count >= maxCallPerMinutes) {
            ctx.res = CallServiceFrequently;
            return null;
        }
        callTimes[socketId] = count + 1;
        return next();
    };
}

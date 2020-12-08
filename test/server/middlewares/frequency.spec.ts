import { mocked } from 'ts-jest/utils';
import frequency, { CallServiceFrequently, NewUserCallServiceFrequently } from '../../../server/middlewares/frequency';
import { Redis } from '../../../server/redis';
import { KoaContext } from '../../../types/koa';
import { runMiddleware } from '../../helpers/middleware';

jest.mock('../../../server/redis');
jest.useFakeTimers();

describe('server/middlewares/frequency', () => {
    it('should response call service frequently', async () => {
        const ctx = {
            socket: {
                id: 'id',
            },
        } as KoaContext;
        const middleware = frequency({
            maxCallPerMinutes: 3,
        });

        const data = await runMiddleware(middleware, ctx);
        expect(ctx.res).toBe(data);
        await runMiddleware(middleware, ctx);
        await runMiddleware(middleware, ctx);
        await runMiddleware(middleware, ctx);
        expect(ctx.res).toBe(CallServiceFrequently);
    });

    it('should stricter for new user', async () => {
        // @ts-ignore
        const ctx = {
            socket: {
                id: 'id',
                user: '1',
            },
        } as KoaContext;
        const middleware = frequency({
            maxCallPerMinutes: 3,
            newUserMaxCallPerMinutes: 1,
        });

        mocked(Redis.has).mockReturnValue(Promise.resolve(true));
        await runMiddleware(middleware, ctx);
        await runMiddleware(middleware, ctx);
        expect(ctx.res).toBe(NewUserCallServiceFrequently);
    });

    it('should clear count data regularly ', async () => {
        const ctx = {
            socket: {
                id: 'id',
            },
        } as KoaContext;
        const middleware = frequency({
            maxCallPerMinutes: 1,
            clearDataInterval: 1000,
        });

        await runMiddleware(middleware, ctx);
        await runMiddleware(middleware, ctx);
        expect(ctx.res).toBe(CallServiceFrequently);

        jest.advanceTimersByTime(1000);
        const data = await runMiddleware(middleware, ctx);
        expect(ctx.res).toBe(data);
    });

    it('should use default value when no params passed', () => {
        frequency();
    });
});

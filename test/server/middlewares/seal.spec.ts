import { mocked } from 'ts-jest/utils';
import seal from '../../../server/middlewares/seal';
import { KoaContext } from '../../../types/koa';
import { runMiddleware } from '../../helpers/middleware';
import { SealText } from '../../../utils/const';
import { Redis } from '../../../server/redis';

jest.mock('../../../server/redis');

describe('server/middlewares/seal', () => {
    it('should call service success', async () => {
        // @ts-ignore
        const ctx = {
            socket: {
                id: 'id',
                user: 'user',
                ip: '1.1.1.1',
            },
        } as KoaContext;

        const data = await runMiddleware(seal(), ctx);
        expect(ctx.res).toBe(data);
    });

    it('should call service fail when user has been sealed', async () => {
        // @ts-ignore
        const ctx = {
            socket: {
                id: 'id',
                user: 'user',
            },
        } as KoaContext;

        mocked(Redis.has).mockReturnValue(Promise.resolve(true));
        await runMiddleware(seal(), ctx);
        expect(ctx.res).toBe(SealText);
    });

    it('should call service fail when ip has been sealed', async () => {
        // @ts-ignore
        const ctx = {
            socket: {
                id: 'id',
                user: 'user',
                ip: '1.1.1.1',
            },
        } as KoaContext;

        mocked(Redis.has).mockReturnValue(Promise.resolve(true));
        await runMiddleware(seal(), ctx);
        expect(ctx.res).toBe(SealText);
    });
});

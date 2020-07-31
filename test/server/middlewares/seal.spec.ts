import { mocked } from 'ts-jest/utils';
import seal from '../../../server/middlewares/seal';
import { KoaContext } from '../../../types/koa';
import { existMemoryData } from '../../../server/memoryData';
import { runMiddleware } from '../../helpers/middleware';
import { SealText } from '../../../utils/const';

jest.mock('../../../server/memoryData');

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

        mocked(existMemoryData).mockReturnValue(true);
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

        mocked(existMemoryData).mockImplementation((storageKey, value) => value === ctx.socket.ip);
        await runMiddleware(seal(), ctx);
        expect(ctx.res).toBe(SealText);
    });
});

import isLogin, { NeedLogin } from '../../../server/middlewares/isLogin';
import { KoaContext } from '../../../types/koa';
import { runMiddleware } from '../../helpers/middleware';

describe('server/middlewares/isLogin', () => {
    it('should call service fail when user not login', async () => {
        // @ts-ignore
        const ctx = {
            event: 'sendMessage',
            socket: {
                id: 'id',
            },
        } as KoaContext;

        await runMiddleware(isLogin(), ctx);
        expect(ctx.res).toBe(NeedLogin);
    });

    it('should call service success when user is login', async () => {
        // @ts-ignore
        const ctx = {
            event: 'sendMessage',
            socket: {
                id: 'id',
                user: 'user',
            },
        } as KoaContext;
        const data = await runMiddleware(isLogin(), ctx);
        expect(ctx.res).toBe(data);
    });

    it('should call service success when it not need login ', async () => {
        // @ts-ignore
        const ctx = {
            event: 'register',
            socket: {
                id: 'id',
            },
        } as KoaContext;

        const data = await runMiddleware(isLogin(), ctx);
        expect(ctx.res).toBe(data);
    });
});

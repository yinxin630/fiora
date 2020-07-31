import { YouAreNotAdministrator } from '../../../server/middlewares/isAdmin';
import { KoaContext } from '../../../types/koa';
import { runMiddleware } from '../../helpers/middleware';

describe('server/middlewares/isAdmin', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('should call service fail when user not administrator', async () => {
        const isAdmin = require('../../../server/middlewares/isAdmin').default;
        // @ts-ignore
        const ctx = {
            event: 'sealUser',
            socket: {
                id: 'id',
                user: 'user',
            },
        } as KoaContext;

        await runMiddleware(isAdmin(), ctx);
        expect(ctx.res).toBe(YouAreNotAdministrator);
    });

    it('should call service success when user is administrator', async () => {
        process.env.Administrator = 'administrator';
        const isAdmin = require('../../../server/middlewares/isAdmin').default;
        // @ts-ignore
        const ctx = {
            event: 'sealUser',
            socket: {
                id: 'id',
                user: 'administrator',
            },
        } as KoaContext;

        const data = await runMiddleware(isAdmin(), ctx);
        expect(ctx.res).toBe(data);
    });
});

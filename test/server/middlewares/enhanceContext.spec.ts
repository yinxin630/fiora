import enhanceContext from '../../../server/middlewares/enhanceContext';
import { KoaContext } from '../../../types/koa';
import { runMiddleware } from '../../helpers/middleware';

describe('server/middlewares/enhanceContext', () => {
    it('should call acknowledge to respose with ctx.res data', async () => {
        // @ts-ignore
        const ctx = {
            acknowledge: jest.fn(),
        } as KoaContext;

        const data = await runMiddleware(enhanceContext(), ctx);
        expect(ctx.acknowledge).toHaveBeenCalledWith(data);
    });
});

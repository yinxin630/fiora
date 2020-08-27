import assert from 'assert';
import catchError from '../../../server/middlewares/catchError';
import { KoaContext } from '../../../types/koa';
import { runMiddleware } from '../../helpers/middleware';

describe('server/middlewares/catchError', () => {
    it('should catch AssertionError and use error message as response data', async () => {
        const ctx = {} as KoaContext;
        const next = async () => {
            assert(false, 'you are wrong');
        };

        await runMiddleware(catchError(), ctx, next);
        expect(ctx.res).toBe('you are wrong');
    });

    it('should catch all uncapture error except AssertionError', async () => {
        const ctx = {} as KoaContext;
        const next = async () => {
            throw Error('some unexpected error');
        };

        await runMiddleware(catchError(), ctx, next);
        expect(ctx.res).toBe('Server Error: some unexpected error');
    });
});

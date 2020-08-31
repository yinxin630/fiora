const MockResponseData = { msg: 'ok' };

// eslint-disable-next-line import/prefer-default-export
export async function runMiddleware(middleware: any, ctx: any, next?: any) {
    next = next || function mockNext() {
        ctx.res = MockResponseData;
    };
    await middleware(ctx, next);
    return ctx.res;
}

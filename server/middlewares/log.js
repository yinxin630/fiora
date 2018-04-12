/**
 * 请求日志
 */
module.exports = function () {
    return async (ctx, next) => {
        if (ctx.event === 'disconnect') {
            return next();
        }

        console.log(`  <-- ${ctx.event}  ${ctx.socket.id} ${ctx.socket.user ? ctx.socket.user : ''}`);
        const before = Date.now();

        await next();

        const after = Date.now();
        const res = JSON.stringify(ctx.res) || '';
        let resSize = `${res.length}B`;
        if (res.length > 1024) {
            resSize = `${Math.ceil(res.length / 1024 * 100) / 100}KB`;
        }
        console.log(`  --> ${ctx.event}  ${after - before}ms ${resSize} ${typeof ctx.res === 'string' ? res : '[data]'}`);
    };
};

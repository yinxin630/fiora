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
        console.log(`  --> ${ctx.event}  ${after - before}ms ${typeof ctx.res === 'string' ? ctx.res : ''}`);
    };
};

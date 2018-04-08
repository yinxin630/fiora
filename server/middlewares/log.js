/**
 * 请求日志
 */
module.exports = function () {
    return async (ctx, next) => {
        console.log(`  <-- ${ctx.event} ${ctx.socket.id} ${JSON.stringify(ctx.data)}`);
        const before = Date.now();

        await next();

        const after = Date.now();
        const res = JSON.stringify(ctx.res) || '';
        let resSize = `${res.length}B`;
        if (res.length > 1024) {
            resSize = `${res.length / 1024}KB`;
        }
        console.log(`  --> ${after - before}ms ${resSize} ${res}`);
    };
};

/**
 * 增强context对象
 */
module.exports = function () {
    return async (ctx, next) => {
        await next();
        if (ctx.acknowledge) {
            ctx.acknowledge(ctx.res);
        }
    };
};

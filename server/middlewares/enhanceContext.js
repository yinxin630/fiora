/**
 * 增强context对象
 */
module.exports = function enhanceContext() {
    return async (ctx, next) => {
        await next();
        if (ctx.acknowledge) {
            ctx.acknowledge(ctx.res);
        }
    };
};

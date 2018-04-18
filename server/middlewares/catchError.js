const assert = require('assert');

/**
 * 全局异常捕获
 */
module.exports = function () {
    return async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            if (err instanceof assert.AssertionError) {
                ctx.res = err.message;
                return;
            }
            ctx.res = `Server Error: ${err.message}`;
            console.error('Unhandled Error\n', err);
        }
    };
};

/**
 * Refusing to seal user requests
 */
const { SealText } = require('../../utils/const');

module.exports = function () {
    return async (ctx, next) => {
        const sealList = global.mdb.get('sealList');
        if (ctx.socket.user && sealList.has(ctx.socket.user.toString())) {
            return ctx.res = SealText;
        }

        await next();
    };
};

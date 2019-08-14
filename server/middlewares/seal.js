/**
 * Refusing to seal user requests
 */
const { SealText } = require('../../utils/const');

module.exports = function seal() {
    return async (ctx, next) => {
        const sealList = global.mdb.get('sealList');
        if (ctx.socket.user && sealList.has(ctx.socket.user.toString())) {
            ctx.res = SealText;
            return null;
        }

        return next();
    };
};

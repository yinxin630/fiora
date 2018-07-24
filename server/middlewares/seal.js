/**
 * Refusing to seal user requests
 */
module.exports = function () {
    return async (ctx, next) => {
        const sealList = global.mdb.get('seatList');
        if (ctx.socket.user && sealList.has(ctx.socket.user)) {
            return ctx.res = '你已经被关进小黑屋中, 请反思后再试';
        }

        await next();
    };
};

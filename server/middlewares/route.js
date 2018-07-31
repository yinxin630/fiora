function noop() {}

/**
 * 路由处理
 * @param {IO} io koa socket io实例
 * @param {Object} routes 路由
 */
module.exports = function (io, _io, routes) {
    Object.keys(routes).forEach((route) => {
        io.on(route, noop);
    });

    return async (ctx) => {
        if (routes[ctx.event]) {
            const { event, data, socket } = ctx;
            ctx.res = await routes[ctx.event]({
                event,
                data,
                socket,
                io,
                _io,
            });
        }
    };
};

function noop() {}

/**
 * 路由处理
 * @param {IO} io koa socket io实例
 * @param {Object} routes 路由
 */
module.exports = function (io, routes) {
    const router = Object.keys(routes).reduce((result, route) => {
        io.on(route, noop);
        result[route] = routes[route];
        return result;
    }, {});
    return async (ctx) => {
        if (router[ctx.event]) {
            const { event, data } = ctx;
            ctx.res = await router[ctx.event]({
                event,
                data,
            });
        }
    };
};

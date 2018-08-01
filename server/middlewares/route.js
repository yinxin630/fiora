function noop() {}

/**
 * 路由处理
 * @param {IO} io koa socket io实例
 * @param {Object} routes 路由
 */
module.exports = function (io, _io, routes) {
    Object.keys(routes).forEach((route) => {
        io.on(route, noop); // 注册事件
    });

    return async (ctx) => {
        // 判断路由是否存在
        if (routes[ctx.event]) {
            const { event, data, socket } = ctx;
            // 执行路由并获取返回数据
            ctx.res = await routes[ctx.event]({
                event, // 事件名
                data, // 请求数据
                socket, // 用户socket实例
                io, // koa-socket实例
                _io, // socket.io实例
            });
        }
    };
};

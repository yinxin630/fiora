const config = require('../../config/server');
/**
 * 管理员功能控制器
 */
module.exports = function isAdmin() {
    /**
     * 需要管理员权限的接口
     */
    const adminEvent = {
        sealUser: true,
        getSealList: true,
        resetUserPassword: true,
    };
    return async (ctx, next) => {
        if (
            adminEvent[ctx.event]
                && ctx.socket.user.toString() !== config.administrator
        ) {
            ctx.res = '你不是管理员';
            return;
        }
        await next();
    };
};

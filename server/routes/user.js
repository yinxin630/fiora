module.exports = {
    register: async (ctx) => {
        console.log('响应', ctx);
        return { msg: 'regiser success' };
    },
    login: async (ctx) => {
        console.log('响应', ctx);
        return { msg: 'login success' };
    },
};

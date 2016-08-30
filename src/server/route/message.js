const isLogin = require('../police/isLogin');

const MessageRoute = {
    'POST /message': function* (socket, data, end) {
        yield* isLogin(socket, data, end);


        end(200, { });
    },
};

module.exports = MessageRoute;

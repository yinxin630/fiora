const assert = require('../util/assert');
const promise = require('bluebird');
const bcrypt = promise.promisifyAll(require('bcrypt'), { suffix: '$' });
const User = require('../model/user');
const Auth = require('../model/auth');
const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const config = require('../../../config/config');

const auth = {
    'POST /auth': function* (socket, data, end) {
        assert(!data.username, end, 400, 'need username param but not exists');
        assert(!data.password, end, 400, 'need password param but not exists');

        let user = yield User.find({ username: data.username });
        assert(user.length === 0, end, 404, `user:'${data.username}' not exists`);

        user = user[0];
        let isPasswordCorrect = bcrypt.compareSync(data.password, user.password);
        assert(!isPasswordCorrect, end, 400, `password not correct`);

        // token过期时间 = 3day
        let token = jwt.encode({ userId: user._id, socketId: socket.id, expires: Date.now() + (1000 * 60 * 60 * 24 * 3) }, config.jwtSecret);

        let auth = yield Auth.find({ user: user._id });
        if (auth.length === 0) {
            auth = new Auth({
                user: user._id,
                clients: [socket.id]
            });
        }
        else {
            auth = auth[0];
            auth.clients.push(socket.id);
        }

        let newAuth = yield auth.save();
        end(200, newAuth);
    },
    'DELETE /auth': function* (socket, data, end) {
        end(200, { });
    }
}

module.exports = auth;
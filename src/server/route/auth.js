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
        let token = jwt.encode({ userId: user._id, ip: socket.handshake.address, expires: Date.now() + (1000 * 60 * 60 * 24 * 3) }, config.jwtSecret);

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
        end(201, { token: token });
    },
    'DELETE /auth': function* (socket, data, end) {
        let auth = yield Auth.find({ clients: socket.id });
        assert(auth.length === 0, end, 400, 'you hava not login');

        auth = auth[0];
        if (auth.clients.length === 1) {
            yield auth.remove();
        }
        else {
            let index = auth.clients.indexOf(socket.id);
            auth.clients.splice(index, 1);
            yield auth.save();
        }

        end(204);
    }
}

module.exports = auth;
const assert = require('../util/assert');
const promise = require('bluebird');
const bcrypt = promise.promisifyAll(require('bcrypt'), { suffix: '$' });
const User = require('../model/user');
const mongoose = require('mongoose');
const isLogin = require('../police/isLogin');

// bcrypt salt length
const saltRounds = 10;

const user = {
    'POST /user': function* (socket, data, end) {
        assert(!data.username, end, 400, 'need username param but not exists');
        assert(!data.password, end, 400, 'need password param but not exists');

        let salt = yield bcrypt.genSalt$(saltRounds);
        let hash = yield bcrypt.hash$(data.password, salt);
        let newUser = new User({
            username: data.username,
            salt: salt,
            password: hash
        });

        let savedUser = null;
        try {
            savedUser = yield newUser.save();
        }
        catch (err) {
            if (err.code === 11000) {
                return end(400, { msg: `username:'${data.username}' already exists` });
            }
            else if (err.message === 'User validation failed') {
                return end(400, { msg: `username:'${data.username}' invalid` });
            }
            console.log('save new user error ->', err);
            return end(500, { msg: 'server error when save new user' });
        }
        end(201, savedUser);
    },
    'GET /user': function* (socket, data, end) {
        assert(!mongoose.Types.ObjectId.isValid(data.id), end, 400, `id:'${data.id}' is invalid`);

        let user = yield User.findById(data.id);
        if (user) {
            end(200, user);
        }
        else {
            end(404, { msg: 'user not exists' });
        }
    },
    'GET /user/me': function* (socket, data, end) {
        yield* isLogin(socket, data, end);
        let user = yield User.findById(socket.user);
        end(200, user);
    },
    'POST /user/friend': function* (socket, data, end) {
        yield* isLogin(socket, data, end);
        assert(!mongoose.Types.ObjectId.isValid(data.userId), end, 400, `userId:'${data.userId}' is invalid`);

        let me = yield User.findById(socket.user);
        if (me.friends.indexOf(data.userId) !== -1) {
            end(204);
        }

        let user = yield User.findById(data.userId);
        assert(!user, end, 400, `user:'${data.userId}' not exists`);

        me.friends.push(user._id);
        yield me.save();
        end(204);
    },
    'DELETE /user/friend': function* (socket, data, end) {
        yield* isLogin(socket, data, end);
        assert(!mongoose.Types.ObjectId.isValid(data.userId), end, 400, `userId:'${data.userId}' is invalid`);

        let me = yield User.findById(socket.user);
        let index = me.friends.indexOf(data.userId);
        if (index === -1) {
            end(204);
        }

        let user = yield User.findById(data.userId);
        assert(!user, end, 400, `user:'${data.userId}' not exists`);

        me.friends.splice(index, 1);
        yield me.save();
        end(204);
    },
    'POST /user/group': function* (socket, data, end) {
        end(200, { });
    },
    'DELETE /user/group': function* (socket, data, end) {
        end(200, { });
    }
}

module.exports = user;
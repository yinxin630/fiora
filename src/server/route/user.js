const assert = require('../util/assert');
const promise = require('bluebird');
const bcrypt = promise.promisifyAll(require('bcrypt'), { suffix: '$' });
const User = require('../model/user');
const Group = require('../model/group');
const mongoose = require('mongoose');
const isLogin = require('../police/isLogin');
const saveImage = require('../util/saveImage');

// bcrypt salt length
const saltRounds = 10;
const avatarColors = ['aquamarine', 'blueviolet', 'chocolate', 'darkcyan', 'darkgrey', 'darkmagenta', 'darkorange', 'darkseagreen', 'darkslategrey',
                    'deeppink', 'deepskyblue', 'dimgrey', 'forestgreen', 'indigo'];

const UserRoute = {
    'POST /user': function* (socket, data, end) {
        assert(!data.username, end, 400, 'need username param but not exists');
        assert(!data.password, end, 400, 'need password param but not exists');

        const defaultGroup = yield Group.findOne({ isDefault: true });

        const salt = yield bcrypt.genSalt$(saltRounds);
        const hash = yield bcrypt.hash$(data.password, salt);
        const newUser = new User({
            username: data.username,
            salt,
            password: hash,
            avatar: avatarColors[Math.floor(Math.random() * avatarColors.length)],
            groups: [defaultGroup],
        });

        let savedUser = null;
        try {
            savedUser = yield newUser.save();
            defaultGroup.members.push(newUser);
            yield defaultGroup.save();
        }
        catch (err) {
            if (err.code === 11000) {
                return end(400, 'username already exists');
            }
            else if (err.message === 'User validation failed') {
                return end(400, 'username invalid');
            }
            console.log('save new user error ->', err);
            return end(500, 'server error when save new user');
        }
        end(201, savedUser);
    },
    'GET /user': function* (socket, data, end) {
        assert(!mongoose.Types.ObjectId.isValid(data.id), end, 400, `id:'${data.id}' is invalid`);

        const user = yield User.findById(data.id, '-password -salt');
        if (user) {
            end(200, user);
        }
        else {
            end(404, { msg: 'user not exists' });
        }
    },
    'GET /user/me': function* (socket, data, end) {
        yield* isLogin(socket, data, end);
        const user = yield User.findById(socket.user, '-password -salt');
        end(200, user);
    },
    'POST /user/friend': function* (socket, data, end) {
        yield* isLogin(socket, data, end);
        assert(!mongoose.Types.ObjectId.isValid(data.userId), end, 400, `userId:'${data.userId}' is invalid`);

        const me = yield User.findById(socket.user);
        if (me.friends.indexOf(data.userId) !== -1) {
            end(204);
        }

        const user = yield User.findById(data.userId);
        assert(!user, end, 400, `user:'${data.userId}' not exists`);

        me.friends.push(user._id);
        yield me.save();
        end(204);
    },
    'DELETE /user/friend': function* (socket, data, end) {
        yield* isLogin(socket, data, end);
        assert(!mongoose.Types.ObjectId.isValid(data.userId), end, 400, `userId:'${data.userId}' is invalid`);

        const me = yield User.findById(socket.user);
        const index = me.friends.indexOf(data.userId);
        if (index === -1) {
            end(204);
        }

        const user = yield User.findById(data.userId);
        assert(!user, end, 400, `user:'${data.userId}' not exists`);

        me.friends.splice(index, 1);
        yield me.save();
        end(204);
    },
    'POST /user/group': function* (socket, data, end) {
        return end(200, { });
    },
    'DELETE /user/group': function* (socket, data, end) {
        return end(200, { });
    },

    'PUT /user/avatar': function* (socket, data, end) {
        yield* isLogin(socket, data, end);
        assert(!data.avatar, end, 400, 'need avatar param but not exists');

        const user = yield User.findById(socket.user, '-password -salt');
        const fileName = `user_${user._id}_${Date.now().toString()}.${data.avatar.match(/data:image\/(.+);base64/)[1]}`;
        user.avatar = yield* saveImage(fileName, data.avatar);
        yield user.save();

        return end(200, user);
    },
};

module.exports = UserRoute;

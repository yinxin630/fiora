const promise = require('bluebird');
const bcrypt = promise.promisifyAll(require('bcrypt'), { suffix: '$' });
const jwt = require('jwt-simple');

const User = require('../model/user');
const Auth = require('../model/auth');
const Group = require('../model/group');
const GroupMessage = require('../model/groupMessage');

const assert = require('../util/assert');
const config = require('../../../config/config');
const isLogin = require('../police/isLogin');

const AuthRoute = {
    'POST /auth': function* (socket, data, end) {
        assert(!data.username, end, 400, 'need username param but not exists');
        assert(!data.password, end, 400, 'need password param but not exists');

        // get user info
        const user = yield User.findOne({ username: data.username }, '-salt');
        assert(!user, end, 404, 'user not exists');

        // check user password
        const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);
        assert(!isPasswordCorrect, end, 400, 'password not correct');

        // populate user info
        const userOpts = [
            {
                path: 'groups',
            },
            {
                path: 'friends',
            },
        ];
        yield User.populate(user, userOpts);

        // populate group info
        const groupOpts = [
            {
                path: 'members',
                select: {
                    _id: true,
                    avatar: true,
                    username: true,
                },
            },
        ];
        for (const group of user.groups) {
            yield Group.populate(group, groupOpts);
            let skip = group.messages.length - 30;
            if (skip < 0) {
                skip = 0;
            }
            group.messages = yield GroupMessage.find({ to: group._id }, null, { skip: skip }).populate({ path: 'from', select: { username: true, avatar: true } });
        }

        // handle client socket. system message room: system
        socket.join('system');
        for (const group of user.groups) {
            socket.join(group._id);
        }

        // token expires time = 3 day
        const token = jwt.encode({ userId: user._id, ip: socket.handshake.address, expires: Date.now() + (1000 * 60 * 60 * 24 * 3) }, config.jwtSecret);

        let auth = yield Auth.findOne({ user: user._id });
        if (!auth) {
            auth = new Auth({
                user: user._id,
                clients: [socket.id],
            });
        }
        else {
            auth.clients.push(socket.id);
        }

        yield auth.save();
        end(201, { user: user, token: token });
    },

    'POST /auth/re': function* (socket, data, end) {
        yield* isLogin(socket, data, end);

        // get user info
        const user = yield User.findById(socket.user, '-password -salt');

        // populate user info
        const userOpts = [
            {
                path: 'groups',
            },
            {
                path: 'friends',
            },
        ];
        yield User.populate(user, userOpts);

        // populate group info
        const groupOpts = [
            {
                path: 'members',
                select: {
                    _id: true,
                    avatar: true,
                    username: true,
                },
            },
        ];
        for (const group of user.groups) {
            yield Group.populate(group, groupOpts);
            let skip = group.messages.length - 30;
            if (skip < 0) {
                skip = 0;
            }
            group.messages = yield GroupMessage.find({ to: group._id }, null, { skip: skip }).populate({ path: 'from', select: { _id: true, username: true, avatar: true } });
        }

        // handle client socket. system message room: system
        socket.join('system');
        for (const group of user.groups) {
            socket.join(group._id);
        }

        let auth = yield Auth.findOne({ user: user._id });
        if (!auth) {
            auth = new Auth({
                user: user._id,
                clients: [socket.id],
            });
        }
        else {
            auth.clients.push(socket.id);
        }

        yield auth.save();
        end(201, user);
    },

    'DELETE /auth': function* (socket, data, end) {
        const auth = yield Auth.findOne({ clients: socket.id });
        if (!auth) {
            return end(400, 'you hava not login');
        }

        if (auth.clients.length === 1) {
            yield auth.remove();
        }
        else {
            const index = auth.clients.indexOf(socket.id);
            auth.clients.splice(index, 1);
            yield auth.save();
        }

        end(204);
    },
};

module.exports = AuthRoute;

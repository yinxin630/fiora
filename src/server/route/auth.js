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
    'POST /auth': function* (data) {
        assert(!data.username, this.end, 400, 'need username param but not exists');
        assert(!data.password, this.end, 400, 'need password param but not exists');

        const auths = yield Auth.find({ clients: this.socket.id });
        if (auths.length > 0) {
            return this.end(401, 'you have login. please logout first');
        }

        // get user info
        const user = yield User.findOne({ username: data.username }, '-salt');
        assert(!user, this.end, 404, 'user not exists');

        // check user password
        const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);
        assert(!isPasswordCorrect, this.end, 400, 'password not correct');

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
            group.messages = yield GroupMessage.find({ to: group._id }, null, { skip: skip }).populate({ path: 'from', select: '_id username gender birthday avatar' });
            yield Group.populate(group, { path: 'creator', select: '_id username' });
        }

        // handle client socket. system message room: system
        this.socket.join('system');
        for (const group of user.groups) {
            this.socket.join(group._id);
        }

        // token expires time = 3 day
        const token = jwt.encode({ userId: user._id, ip: this.socket.handshake.address, expires: Date.now() + (1000 * 60 * 60 * 24 * 3) }, config.jwtSecret);

        let auth = yield Auth.findOne({ user: user._id });
        if (!auth) {
            auth = new Auth({
                user: user._id,
                clients: [this.socket.id],
            });
        }
        else {
            auth.clients.push(this.socket.id);
        }

        yield auth.save();
        this.end(201, { user: user, token: token });
    },

    'POST /auth/re': function* (data) {
        yield* isLogin(this.socket, data, this.end);

        const auths = yield Auth.find({ clients: this.socket.id });
        if (auths.length > 0) {
            return this.end(401, 'you have login. please logout first');
        }

        // get user info
        const user = yield User.findById(this.socket.user, '-password -salt');

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
            group.messages = yield GroupMessage.find({ to: group._id }, null, { skip: skip }).populate({ path: 'from', select: '_id username gender birthday avatar' });
            yield Group.populate(group, { path: 'creator', select: '_id username' });
        }

        // handle client socket. system message room: system
        this.socket.join('system');
        for (const group of user.groups) {
            this.socket.join(group._id);
        }

        let auth = yield Auth.findOne({ user: user._id });
        if (!auth) {
            auth = new Auth({
                user: user._id,
                clients: [this.socket.id],
            });
        }
        else {
            auth.clients.push(this.socket.id);
        }

        yield auth.save();
        this.end(201, user);
    },

    'DELETE /auth': function* () {
        const auth = yield Auth.findOne({ clients: this.socket.id }).populate('user');
        if (!auth) {
            return this.end(400, 'you hava not login');
        }

        this.socket.leave('system');
        for (const group of auth.user.groups) {
            this.socket.leave(group._id);
        }

        if (auth.clients.length === 1) {
            yield auth.remove();
        }
        else {
            const index = auth.clients.indexOf(this.socket.id);
            auth.clients.splice(index, 1);
            yield auth.save();
        }

        this.end(204);
    },

    'GET /auth/count': function* () {
        const onlineCount = yield Auth.count({});
        this.end(200, { onlineCount });
    },
};

module.exports = AuthRoute;

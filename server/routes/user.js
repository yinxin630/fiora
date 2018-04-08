const assert = require('assert');
const bluebird = require('bluebird');
const bcrypt = bluebird.promisifyAll(require('bcrypt'), { suffix: '$' });
const jwt = require('jwt-simple');

const User = require('../models/user');
const Group = require('../models/group');
const Socket = require('../models/socket');
const config = require('../../config/server');

const saltRounds = 10;

module.exports = {
    async register(ctx) {
        const {
            username, password, os, browser, environment,
        } = ctx.data;
        assert(username, '用户名不能为空');
        assert(password, '密码不能为空');

        const user = await User.findOne({ username });
        assert(!user, '该用户名已存在');

        const defaultGroup = await Group.findOne({ isDefault: true });
        assert(defaultGroup, '默认群组不存在');

        const salt = await bcrypt.genSalt$(saltRounds);
        const hash = await bcrypt.hash$(password, salt);

        let newUser = null;
        try {
            newUser = await User.create({
                username,
                salt,
                password: hash,
                groups: [defaultGroup],
            });
        } catch (err) {
            assert.equal(err.message, 'User validation failed', '用户名包含不支持的字符 ');
        }

        defaultGroup.members.push(newUser);
        await defaultGroup.save();

        const token = jwt.encode({ user: newUser._id, expires: Date.now() + config.tokenExpiresTime }, config.jwtSecret);

        ctx.socket.user = newUser._id;
        await Socket.update({ id: ctx.socket.id }, {
            user: newUser._id,
            os,
            browser,
            environment,
        });

        return {
            _id: newUser._id,
            avatar: newUser.avatar,
            username: newUser.username,
            expressions: newUser.expressions,
            groups: [{
                name: defaultGroup.name,
                avatar: defaultGroup.avatar,
                createTime: defaultGroup.createTime,
            }],
            token,
        };
    },
    async login(ctx) {
        const {
            username, password, os, browser, environment,
        } = ctx.data;
        assert(username, '用户名不能为空');
        assert(password, '密码不能为空');

        const user = await User.findOne({ username });
        assert(user, '该用户不存在');

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        assert(isPasswordCorrect, '密码错误');

        user.lastLoginTime = Date.now();
        await user.save();

        const groups = await Group.find({ members: user }, {
            _id: 1, name: 1, avatar: 1, createTime: 1,
        });
        groups.forEach((group) => {
            ctx.socket.socket.join(group._id);
            return group;
        });

        const token = jwt.encode({ user: user._id, expires: Date.now() + config.tokenExpiresTime }, config.jwtSecret);

        ctx.socket.user = user._id;
        await Socket.update({ id: ctx.socket.id }, {
            user: user._id,
            os,
            browser,
            environment,
        });

        return {
            _id: user._id,
            avatar: user.avatar,
            username: user.username,
            expressions: user.expressions,
            groups,
            token,
        };
    },
};

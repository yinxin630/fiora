const assert = require('assert');
const bluebird = require('bluebird');
const bcrypt = bluebird.promisifyAll(require('bcrypt'), { suffix: '$' });

const User = require('../models/user');
const Group = require('../models/group');
const Socket = require('../models/socket');

const saltRounds = 10;

module.exports = {
    register: async (ctx) => {
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
        };
    },
    login: async (ctx) => {
        console.log('响应', ctx);
        return { msg: 'login success' };
    },
};

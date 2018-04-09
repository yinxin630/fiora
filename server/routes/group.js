const assert = require('assert');

// const User = require('../models/user');
const Group = require('../models/group');

module.exports = {
    async createGroup(ctx) {
        const { name } = ctx.data;

        const group = await Group.findOne({ name });
        assert(!group, '该群组已存在');

        let newGroup = null;
        try {
            newGroup = await Group.create({
                name,
                creator: ctx.socket.user,
                members: [ctx.socket.user],
            });
        } catch (err) {
            if (err.message === 'Group validation failed') {
                return '群组名包含不支持的字符或者长度超过限制';
            }
            throw err;
        }

        ctx.socket.socket.join(newGroup._id);
        return {
            _id: newGroup._id,
            name: newGroup.name,
            avatar: newGroup.avatar,
            createTime: newGroup.createTime,
        };
    },
};

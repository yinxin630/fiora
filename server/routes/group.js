const assert = require('assert');
const { isValid } = require('mongoose').Types.ObjectId;

const Group = require('../models/group');
const Socket = require('../models/socket');
const Message = require('../models/message');
const config = require('../../config/server');
const getRandomAvatar = require('../../utils/getRandomAvatar');

async function getGroupOnlineMembers(group) {
    const sockets = await Socket
        .find(
            { user: group.members },
            { os: 1, browser: 1, environment: 1, user: 1 },
        )
        .populate(
            'user',
            { username: 1, avatar: 1 },
        );
    const filterSockets = sockets.reduce((result, socket) => {
        result[socket.user] = socket;
        return result;
    }, {});
    return Object.values(filterSockets);
}

module.exports = {
    async createGroup(ctx) {
        const ownGroupCount = await Group.count({ creator: ctx.socket.user });
        assert(ownGroupCount < config.maxGroupsCount, `创建群组失败, 你已经创建了${config.maxGroupsCount}个群组`);

        const { name } = ctx.data;
        assert(name, '群组名不能为空');

        const group = await Group.findOne({ name });
        assert(!group, '该群组已存在');

        let newGroup = null;
        try {
            newGroup = await Group.create({
                name,
                avatar: getRandomAvatar(),
                creator: ctx.socket.user,
                members: [ctx.socket.user],
            });
        } catch (err) {
            if (err.name === 'ValidationError') {
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
            creator: newGroup.creator,
        };
    },
    async joinGroup(ctx) {
        const { groupId } = ctx.data;
        assert(isValid(groupId), '无效的群组ID');

        const group = await Group.findOne({ _id: groupId });
        assert(group, '加入群组失败, 群组不存在');
        assert(group.members.indexOf(ctx.socket.user) === -1, '你已经在群组中');

        group.members.push(ctx.socket.user);
        await group.save();

        const messages = await Message
            .find(
                { toGroup: groupId },
                { type: 1, content: 1, from: 1, createTime: 1 },
                { sort: { createTime: -1 }, limit: 3 },
            )
            .populate('from', { username: 1, avatar: 1 });
        messages.reverse();

        ctx.socket.socket.join(group._id);

        return {
            _id: group._id,
            name: group.name,
            avatar: group.avatar,
            createTime: group.createTime,
            creator: group.creator,
            messages,
        };
    },
    async leaveGroup(ctx) {
        const { groupId } = ctx.data;
        assert(isValid(groupId), '无效的群组ID');

        const group = await Group.findOne({ _id: groupId });
        assert(group, '群组不存在');

        // 默认群组没有creator
        if (group.creator) {
            assert(group.creator.toString() !== ctx.socket.user.toString(), '群主不可以退出自己创建的群');
        }

        const index = group.members.indexOf(ctx.socket.user);
        assert(index !== -1, '你不在群组中');

        group.members.splice(index, 1);
        await group.save();

        ctx.socket.socket.leave(group._id);

        return {};
    },
    async getGroupOnlineMembers(ctx) {
        const { groupId } = ctx.data;
        assert(isValid(groupId), '无效的群组ID');

        const group = await Group.findOne({ _id: groupId });
        assert(group, '群组不存在');
        return getGroupOnlineMembers(group);
    },
    async getDefaultGroupOnlineMembers() {
        const group = await Group.findOne({ isDefault: true });
        assert(group, '群组不存在');
        return getGroupOnlineMembers(group);
    },
    async changeGroupAvatar(ctx) {
        const { groupId, avatar } = ctx.data;
        assert(isValid(groupId), '无效的群组ID');
        assert(avatar, '头像地址不能为空');

        await Group.update({ _id: groupId }, { avatar });
        return {};
    },
};

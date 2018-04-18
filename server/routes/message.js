const assert = require('assert');
const mongoose = require('mongoose');

const User = require('../models/user');
const Group = require('../models/group');
const Message = require('../models/message');
const Socket = require('../models/socket');
const xss = require('../../utils/xss');
const getFriendId = require('../../utils/getFriendId');

const FirstTimeMessagesCount = 15;
const EachFetchMessagesCount = 30;

module.exports = {
    async sendMessage(ctx) {
        const { to, type, content } = ctx.data;
        assert(to, 'to不能为空');

        let groupId = '';
        let userId = '';
        if (mongoose.Types.ObjectId.isValid(to)) {
            const group = await Group.findOne({ _id: to });
            assert(group, '群组不存在');
            groupId = to;
        } else {
            userId = to.replace(ctx.socket.user, '');
            const user = await User.findOne({ _id: userId });
            assert(user, '用户不存在');
        }

        let messageContent = content;
        if (type === 'text') {
            assert(messageContent.length <= 2048, '消息长度过长');
            messageContent = xss(content);
        }

        const user = await User.findOne({ _id: ctx.socket.user }, { username: 1, avatar: 1 });
        let message;
        try {
            message = await Message.create({
                from: ctx.socket.user,
                to,
                type,
                content: messageContent,
            });
        } catch (err) {
            throw err;
        }

        const messageData = {
            _id: message._id,
            createTime: message.createTime,
            from: user.toObject(),
            to,
            type,
            content: messageContent,
        };

        if (groupId) {
            ctx.socket.socket.to(groupId).emit('message', messageData);
        } else {
            const sockets = await Socket.find({ user: userId });
            sockets.forEach((socket) => {
                console.log(socket.id);
                ctx._io.to(socket.id).emit('message', messageData);
            });
        }

        return messageData;
    },
    async getGroupsLastMessages(ctx) {
        const { groups } = ctx.data;

        const promises = groups.map(groupId =>
            Message
                .find(
                    { to: groupId },
                    { type: 1, content: 1, from: 1, createTime: 1 },
                    { sort: { createTime: -1 }, limit: FirstTimeMessagesCount },
                )
                .populate('from', { username: 1, avatar: 1 }));
        const results = await Promise.all(promises);
        const messages = groups.reduce((result, groupId, index) => {
            result[groupId] = (results[index] || []).reverse();
            return result;
        }, {});

        return messages;
    },
    async getFriendsLastMessages(ctx) {
        const { users } = ctx.data;

        const promises = users.map(userId =>
            Message
                .find(
                    { to: getFriendId(ctx.socket.user, userId) },
                    { type: 1, content: 1, from: 1, createTime: 1 },
                    { sort: { createTime: -1 }, limit: FirstTimeMessagesCount },
                )
                .populate('from', { username: 1, avatar: 1 }));
        const results = await Promise.all(promises);
        const messages = users.reduce((result, userId, index) => {
            result[getFriendId(ctx.socket.user, userId)] = (results[index] || []).reverse();
            return result;
        }, {});

        return messages;
    },
    async getDefalutGroupMessages() {
        const group = await Group.findOne({ isDefault: true });
        const messages = await Message
            .find(
                { to: group._id },
                { type: 1, content: 1, from: 1, createTime: 1 },
                { sort: { createTime: -1 }, limit: FirstTimeMessagesCount },
            )
            .populate('from', { username: 1, avatar: 1 });
        return messages.reverse();
    },
    async getGroupHistoryMessages(ctx) {
        const { groupId, existCount } = ctx.data;

        const messages = await Message
            .find(
                { to: groupId },
                { type: 1, content: 1, from: 1, createTime: 1 },
                { sort: { createTime: -1 }, limit: EachFetchMessagesCount + existCount },
            )
            .populate('from', { username: 1, avatar: 1 });
        const result = messages.slice(existCount).reverse();
        return result;
    },
};

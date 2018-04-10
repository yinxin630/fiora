const assert = require('assert');

const User = require('../models/user');
const Group = require('../models/group');
const Message = require('../models/message');

module.exports = {
    async sendMessage(ctx) {
        const { toGroup, type, content } = ctx.data;
        assert(toGroup, 'toGroup不能为空');

        const group = await Group.findOne({ _id: toGroup });
        assert(group, '消息发往的群组不存在');

        const user = await User.findOne({ _id: ctx.socket.user }, { username: 1, avatar: 1 });
        try {
            await Message.create({
                from: ctx.socket.user,
                toGroup,
                type,
                content,
            });
        } catch (err) {
            throw err;
        }

        const messageData = {
            from: user.toObject(),
            toGroup,
            type,
            content,
        };
        ctx.socket.socket.to(toGroup).emit('message', messageData);

        return messageData;
    },
    async getGroupsLastMessages(ctx) {
        const { groups } = ctx.data;

        const promises = groups.map(groupId => Message.find(
            { toGroup: groupId },
            { toGroup: 1, type: 1, content: 1 },
            { sort: { createTime: -1 }, limit: 20 },
        ));
        const results = await Promise.all(promises);
        const messages = groups.reduce((result, groupId, index) => {
            result[groupId] = (results[index] || []).reverse();
            return result;
        }, {});

        return messages;
    },
};

const axios = require('axios');
const assert = require('assert');
const User = require('../models/user');
const Group = require('../models/group');

module.exports = {
    async search(ctx) {
        const { keywords } = ctx.data;
        if (keywords === '') {
            return {
                users: [],
                groups: [],
            };
        }

        const users = await User.find(
            { username: { $regex: keywords } },
            { avatar: 1, username: 1 },
        );
        const groups = await Group.find(
            { name: { $regex: keywords } },
            { avatar: 1, name: 1, members: 1 },
        );

        return {
            users,
            groups: groups.map(group => ({
                _id: group._id,
                avatar: group.avatar,
                name: group.name,
                members: group.members.length,
            })),
        };
    },
    async searchExpression(ctx) {
        const { keywords } = ctx.data;
        if (keywords === '') {
            return [];
        }

        const res = await axios.get(`https://www.doutula.com/search?keyword=${encodeURIComponent(keywords)}`);
        assert(res.status === 200, '搜索表情包失败, 请重试');

        const images = res.data.match(/data-original="[^ "]+"/g) || [];
        return images.map(i => i.substring(15, i.length - 1));
    },
};

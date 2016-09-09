const User = require('../model/user');
const Group = require('../model/group');
const GroupMessage = require('../model/groupMessage');
const isLogin = require('../police/isLogin');
const config = require('../../../config/config');
const saveImage = require('../util/saveImage');
const assert = require('../util/assert');

const GroupMessageRoute = {
    'POST /groupMessage': function* (data) {
        yield* isLogin(this.socket, data, this.end);
        assert(!data.type, this.end, 400, 'need type param but not exists');
        assert(!data.content, this.end, 400, 'need content param but not exists');
        assert(!data.linkmanId, this.end, 400, 'need linkmanId param but not exists');

        const user = yield User.findById(this.socket.user);
        const group = yield Group.findById(data.linkmanId);

        if (data.type === 'text') {
            data.content = data.content.slice(0, config.maxMessageLength);
            data.content = data.content
                .replace(/&/g, '&amp')
                .replace(/"/g, '&quot;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/'/g, '&apos;');
        }
        else if (data.type === 'image') {
            // if data.content is image data
            if (/^data:image/.test(data.content)) {
                const fileName = `message_${Date.now().toString()}.${data.content.match(/data:image\/(.+);base64/)[1]}`;
                data.content = yield* saveImage(fileName, data.content);
            }
        }

        const message = new GroupMessage({
            from: user,
            to: group,
            type: data.type,
            content: data.content,
        });

        let savedMessage = null;
        try {
            savedMessage = yield message.save();
            group.messages.push(savedMessage);
            yield group.save();
        }
        catch (err) {
            this.end(500, { msg: 'server error when save new message' });
        }

        yield GroupMessage.populate(savedMessage, { path: 'from', select: '_id username gender birthday avatar' });
        this.socket.to(group._id.toString()).emit('groupMessage', savedMessage);

        this.end(201, savedMessage);
    },
};

module.exports = GroupMessageRoute;

const isLogin = require('../police/isLogin');
const assert = require('../util/assert');
const saveImage = require('../util/saveImage');
const User = require('../model/user');
const Message = require('../model/message');
const config = require('../../../config/config');

const MessageRoute = {
    'POST /message': function* (socket, data, end) {
        yield* isLogin(socket, data, end);
        assert(!data.type, end, 400, 'need type param but not exists');
        assert(!data.content, end, 400, 'need content param but not exists');
        assert(!data.linkmanId, end, 400, 'need linkmanId param but not exists');

        const sender = yield User.findById(socket.user);
        const receiver = yield User.findById(data.linkmanId);

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

        const message = new Message({
            from: sender,
            to: receiver,
            type: data.type,
            content: data.content,
        });

        let savedMessage = null;
        try {
            savedMessage = yield message.save();
        }
        catch (err) {
            end(500, { msg: 'server error when save new message' });
        }

        socket.to(receiver._id.toString()).emit('message', savedMessage);
        end(201, savedMessage);
    },
};

module.exports = MessageRoute;

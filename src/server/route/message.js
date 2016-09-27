const mongoose = require('mongoose');
const isLogin = require('../police/isLogin');
const assert = require('../util/assert');
const imageUtil = require('../util/image');
const User = require('../model/user');
const Message = require('../model/message');
const Auth = require('../model/auth');
const config = require('../../../config/config');
const messageFrequency = require('../util/messageFrequency');

const MessageRoute = {
    'POST /message': function* (data) {
        yield* isLogin(this.socket, data, this.end);
        if (!messageFrequency(this.socket.user)) {
            return this.end(401, 'send messages too frequently');
        }
        assert(!data.type, this.end, 400, 'need type param but not exists');
        assert(!data.content, this.end, 400, 'need content param but not exists');
        assert(!data.linkmanId, this.end, 400, 'need linkmanId param but not exists');
        assert(!mongoose.Types.ObjectId.isValid(data.linkmanId), this.end, 400, 'linkmanId is invalid');

        const sender = yield User.findById(this.socket.user);
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
                data.content = yield* imageUtil.saveImageData(fileName, data.content);
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
            yield Message.populate(message, { path: 'from', select: '_id username gender birthday avatar' });
            yield Message.populate(message, { path: 'to', select: '_id username gender birthday avatar' });
        }
        catch (err) {
            return this.end(500, 'server error when save new message');
        }

        const receiverAuth = yield Auth.findOne({ user: receiver });
        if (!receiverAuth) {
            return this.end(201, savedMessage);
        }
        for (const client of receiverAuth.clients) {
            this.io.to(client).emit('message', savedMessage);
        }

        this.end(201, savedMessage);
    },
};

module.exports = MessageRoute;

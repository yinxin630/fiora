const assert = require('../util/assert');
const promise = require('bluebird');
const User = require('../model/user');
const Group = require('../model/group');
const GroupMessage = require('../model/groupMessage');
const mongoose = require('mongoose');
const isLogin = require('../police/isLogin');

const groupMessage = {
    'POST /groupMessage': function* (socket, data, end) {
        yield* isLogin(socket, data, end);

        let user = yield User.findById(socket.user);
        let group = yield Group.findById(data.linkmanId);
        let message = new GroupMessage({
            from: user,
            to: group,
            type: 'text',
            content: data.content,
        });

        let savedMessage = null;
        try {
            savedMessage = yield message.save();
        }
        catch(err) {
            end(500, { msg: 'server error when save new message' });
        }

        socket.to(group._id.toString()).emit('groupMessage', savedMessage);

        end(201, savedMessage);
    }
}

module.exports = groupMessage;
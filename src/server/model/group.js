const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    createTime: { type: Date, default: Date.now },
    updateTime: { type: Date, default: Date.now },

    name: {
        type: String,
        trim: true,
        unique: true,
        match: /^[\-_0-9a-z\u4e00-\u9eff]{1,16}$/i,
    },
    avatar: {
        type: String,
        default: 'http://oc58aytf1.bkt.clouddn.com/group_avatar_default',
    },
    announcement: String,
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    isDefault: {
        type: Boolean,
        default: false,
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'GroupMessage',
        },
    ],
});

const Group = mongoose.model('Group', GroupSchema);
module.exports = Group;

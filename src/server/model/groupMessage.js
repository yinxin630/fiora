const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GroupMessageSchema = new Schema({
    createTime: { type: Date, default: Date.now },
    updateTime: { type: Date, default: Date.now },

    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
    },
    type: {
        type: String,
        enum: ['text', 'image'],
        default: 'text',
    },
    content: {
        type: String,
        default: '',
    },
    isRead: {
        type: Boolean,
        false: false,
    },
});

const GroupMessage = mongoose.model('GroupMessage', GroupMessageSchema);
module.exports = GroupMessage;

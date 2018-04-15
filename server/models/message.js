const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema({
    createTime: { type: Date, default: Date.now, index: true },

    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    toUser: {
        type: String,
        index: true,
    },
    toGroup: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        index: true,
    },
    type: {
        type: String,
        enum: ['text', 'image', 'code', 'url', 'file'],
        default: 'text',
    },
    content: {
        type: String,
        default: '',
    },
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;

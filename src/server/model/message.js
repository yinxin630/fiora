const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    createTime: { type: Date, default: Date.now, index: true },
    updateTime: { type: Date, default: Date.now },
    
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        enum: ['text', 'image'],
        default: 'text'
    },
    content: {
        type: String,
        default: ''
    },
    isRead: {
        type: Boolean,
        false: false
    }
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
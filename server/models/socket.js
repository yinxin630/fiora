const mongoose = require('mongoose');

const { Schema } = mongoose;

const SocketSchema = new Schema({
    createTime: { type: Date, default: Date.now },

    id: {
        type: String,
        index: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    token: {
        type: String,
    },
    os: {
        type: String,
    },
    browser: {
        type: String,
    },
});

const Socket = mongoose.model('Socket', SocketSchema);
module.exports = Socket;

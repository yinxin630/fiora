const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthSchema = new Schema({
    createTime: { type: Date, default: Date.now },
    updateTime: { type: Date, default: Date.now },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    clients: [
        {
            type: String,
        },
    ],
});

const Auth = mongoose.model('Auth', AuthSchema);
module.exports = Auth;

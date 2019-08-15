const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    createTime: { type: Date, default: Date.now },
    lastLoginTime: { type: Date, default: Date.now },

    username: {
        type: String,
        trim: true,
        unique: true,
        match: /^([0-9a-zA-Z]{1,2}|[\u4e00-\u9eff]){1,8}$/,
        index: true,
    },
    salt: String,
    password: String,
    avatar: {
        type: String,
    },
    expressions: [
        {
            type: String,
        },
    ],
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

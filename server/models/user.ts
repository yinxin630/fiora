import { Schema, model, Document } from 'mongoose';

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
    avatar: String,
    tag: {
        type: String,
        default: '',
        trim: true,
        match: /^([0-9a-zA-Z]{1,2}|[\u4e00-\u9eff]){1,5}$/,
    },
    expressions: [
        {
            type: String,
        },
    ],
    notificationTokens: [{ type: String }],
});

export interface UserDocument extends Document {
    /** 用户名 */
    username: string;
    /** 密码加密盐 */
    salt: string;
    /** 加密的密码 */
    password: string;
    /** 头像 */
    avatar: string;
    /** 用户标签 */
    tag: string;
    /** 表情收藏 */
    expressions: string[];
    notificationTokens: string[];
    /** 创建时间 */
    createTime: Date;
    /** 最后登录时间 */
    lastLoginTime: Date;
}

/**
 * User Model
 * 用户信息
 */
const User = model<UserDocument>('User', UserSchema);

export default User;

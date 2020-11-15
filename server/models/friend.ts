import { Schema, model, Document } from 'mongoose';

const FriendSchema = new Schema({
    createTime: { type: Date, default: Date.now },

    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

export interface FriendDocument extends Document {
    /** 源用户id */
    from: Schema.Types.ObjectId | Record<string, any>;
    /** 目标用户id */
    to: Schema.Types.ObjectId | Record<string, any>;
    /** 创建时间 */
    createTime: Date;
}

/**
 * Friend Model
 * 好友信息
 * 好友关系是单向的
 */
const Friend = model<FriendDocument>('Friend', FriendSchema);

export default Friend;

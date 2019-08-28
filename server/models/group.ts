import { Schema, model, Document } from 'mongoose';
import { UserDocument } from './user';

const GroupSchema = new Schema({
    createTime: { type: Date, default: Date.now },

    name: {
        type: String,
        trim: true,
        unique: true,
        match: /^([0-9a-zA-Z]{1,2}|[\u4e00-\u9eff]){1,8}$/,
        index: true,
    },
    avatar: String,
    announcement: {
        type: String,
        default: '',
    },
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
});

export declare interface GroupDocument extends Document {
    /** 数据库 id */
    _id: Schema.Types.ObjectId;
    /** 群组名 */
    name: string;
    /** 头像 */
    avatar: string;
    /** 公告 */
    announcement: string;
    /** 创建者 */
    creator: UserDocument;
    /** 是否为默认群组 */
    isDefault: boolean;
    /** 成员 */
    members: Schema.Types.ObjectId[];
    /** 创建时间 */
    createTime: Date;
}

/**
 * Group Model
 * 群组信息
 */
const Group = model<GroupDocument>('Group', GroupSchema);

export default Group;

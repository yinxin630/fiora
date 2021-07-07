import { Schema, model, Document } from 'mongoose';
import { NameRegexp } from '../../utils/const';

const GroupSchema = new Schema({
    createTime: { type: Date, default: Date.now },

    name: {
        type: String,
        trim: true,
        unique: true,
        match: NameRegexp,
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

export interface GroupDocument extends Document {
    /** 群组名 */
    name: string;
    /** 头像 */
    avatar: string;
    /** 公告 */
    announcement: string;
    /** 创建者 */
    creator: string;
    /** 是否为默认群组 */
    isDefault: boolean;
    /** 成员 */
    members: string[];
    /** 创建时间 */
    createTime: Date;
}

/**
 * Group Model
 * 群组信息
 */
const Group = model<GroupDocument>('Group', GroupSchema);

export default Group;

import { Schema, model, Document } from 'mongoose';

const MessageSchema = new Schema({
    createTime: { type: Date, default: Date.now, index: true },

    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    to: {
        type: String,
        index: true,
    },
    type: {
        type: String,
        enum: ['text', 'image', 'file', 'code', 'invite', 'system'],
        default: 'text',
    },
    content: {
        type: String,
        default: '',
    },
});

export interface MessageDocument extends Document {
    /** 发送人 */
    from: Schema.Types.ObjectId | Record<string, any>;
    /** 接受者, 发送给群时为群_id, 发送给个人时为俩人的_id按大小序拼接后值 */
    to: string;
    /** 类型, text: 文本消息, image: 图片消息, code: 代码消息, invite: 邀请加群消息, system: 系统消息 */
    type: string;
    /** 内容, 某些消息类型会存成JSON */
    content: string;
    /** 创建时间 */
    createTime: Date;
}

/**
 * Message Model
 * 聊天消息
 */
const Message = model<MessageDocument>('Message', MessageSchema);

export default Message;

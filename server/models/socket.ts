import { Schema, model, Document } from 'mongoose';

const SocketSchema = new Schema({
    createTime: { type: Date, default: Date.now },

    id: {
        type: String,
        unique: true,
        index: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    ip: String,
    os: {
        type: String,
        default: '',
    },
    browser: {
        type: String,
        default: '',
    },
    environment: {
        type: String,
        default: '',
    },
});

export interface SocketDocument extends Document {
    /** socket连接id */
    id: string;
    /** 关联用户id */
    user: any;
    /** ip地址 */
    ip: string;
    /** 系统 */
    os: string;
    /** 浏览器 */
    browser: string;
    /** 详细环境信息 */
    environment: string;
    /** 创建时间 */
    createTime: Date;
}

/**
 * Socket Model
 * 客户端socket连接信息
 */
const Socket = model<SocketDocument>('Socket', SocketSchema);

export default Socket;

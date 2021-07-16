import { Schema, model, Document } from 'mongoose';

const HistoryScheme = new Schema({
    user: {
        type: String,
        required: true,
    },
    linkman: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

export interface HistoryDocument extends Document {
    /** user id */
    user: string;

    /** linkman id */
    linkman: string;

    /** last readed message id */
    message: string;
}

const History = model<HistoryDocument>('History', HistoryScheme);

export default History;

export async function createOrUpdateHistory(userId: string, linkmanId: string, messageId: string) {
    const history = await History.findOne({ user: userId, linkman: linkmanId });
    if (history) {
        history.message = messageId;
        await history.save();
    } else {
        await History.create({
            user: userId,
            linkman: linkmanId,
            message: messageId,
        });
    }
    return {};
}

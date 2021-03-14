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

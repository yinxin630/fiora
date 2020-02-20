/**
 * 连接 MongoDB
 */

import mongoose from 'mongoose';

import config from '../config/server';

mongoose.Promise = Promise;
mongoose.set('useCreateIndex', true);

export default function connectDB() {
    return new Promise((resolve, reject) => {
        mongoose.connect(
            config.database,
            { useNewUrlParser: true, useUnifiedTopology: true },
            async (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            },
        );
    });
}

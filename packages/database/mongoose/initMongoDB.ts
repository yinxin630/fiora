/**
 * 连接 MongoDB
 */

import mongoose from 'mongoose';

import config from '@fiora/config/server';
import logger from '@fiora/utils/logger';

mongoose.Promise = Promise;
mongoose.set('useCreateIndex', true);

export default function initMongoDB() {
    return new Promise((resolve) => {
        mongoose.connect(
            config.database,
            { useNewUrlParser: true, useUnifiedTopology: true },
            async (err) => {
                if (err) {
                    logger.error('[mongoDB]', err.message);
                    process.exit(0);
                } else {
                    resolve(null);
                }
            },
        );
    });
}

export { mongoose };

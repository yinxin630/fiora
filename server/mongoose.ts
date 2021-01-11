/**
 * 连接 MongoDB
 */

import chalk from 'chalk';
import mongoose from 'mongoose';

import config from '../config/server';

mongoose.Promise = Promise;
mongoose.set('useCreateIndex', true);

export default function initMongoDB() {
    return new Promise((resolve) => {
        mongoose.connect(
            config.database,
            { useNewUrlParser: true, useUnifiedTopology: true },
            async (err) => {
                if (err) {
                    console.log(chalk.red('Connect database fail!'), err.message);
                    process.exit(0);
                } else {
                    resolve();
                }
            },
        );
    });
}

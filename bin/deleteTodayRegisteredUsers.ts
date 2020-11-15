/**
 * Delete users created today and their related data
 */
import chalk from 'chalk';

import connectDB from '../server/mongoose';
import User from '../server/models/user';
import { deleteUser } from './deleteUser';

export async function deleteTodayRegisteredUsers() {
    try {
        await connectDB();
    } catch (err) {
        console.log(chalk.red('Connect database fail!', err.message));
    }

    const now = new Date();
    const time = new Date(
        `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} 00:00:00`,
    ).getTime();
    const users = await User.find({
        createTime: {
            $gte: time,
        },
    });
    console.log(`There are ${chalk.green(users.length.toString())} newly registered users today`);

    await Promise.all(users.map((user) => deleteUser(user._id.toString())));

    console.log(chalk.green('Successfully deleted today’s newly registered users'));
}

async function run() {
    await deleteTodayRegisteredUsers();
    process.exit(0);
}
export default run;

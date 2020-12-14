/**
 * Delete users created today and their related data
 */
import chalk from 'chalk';

import inquirer from 'inquirer';
import connectDB from '../server/mongoose';
import User from '../server/models/user';
import { deleteUser } from './deleteUser';

export async function deleteTodayRegisteredUsers() {
    await connectDB();

    const now = new Date();
    const time = new Date(
        `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} 00:00:00`,
    );
    const users = await User.find({
        createTime: {
            $gte: time,
        },
    });
    console.log(`There are ${chalk.green(users.length.toString())} newly registered users today`);
    if (users.length === 0) {
        return;
    }

    const shouldDeleteUsers = await inquirer.prompt({
        type: 'confirm',
        name: 'result',
        message: 'Confirm to delete these users?',
    });
    if (!shouldDeleteUsers.result) {
        return;
    }
    await Promise.all(users.map((user) => deleteUser(user._id.toString(), false)));

    console.log(chalk.green('Successfully deleted today’s newly registered users'));
}

async function run() {
    await deleteTodayRegisteredUsers();
    process.exit(0);
}
export default run;

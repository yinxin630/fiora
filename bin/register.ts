/**
 * Register
 */

import bcrypt from 'bcryptjs';
import chalk from 'chalk';

import User, { UserDocument } from '../server/models/user';
import Group from '../server/models/group';

import { saltRounds } from '../utils/const';
import getRandomAvatar from '../utils/getRandomAvatar';
import connectDB from '../server/mongoose';

export async function register(username: string, password: string) {
    if (!username) {
        console.log(
            chalk.red(
                'Wrong command, [username] is missing.',
                chalk.green('Usage: yarn script register [username] [password]'),
            ),
        );
        return;
    }
    if (!password) {
        console.log(
            chalk.red(
                'Wrong command, [password] is missing.',
                chalk.green('Usage: yarn script register [username] [password]'),
            ),
        );
        return;
    }

    try {
        await connectDB();
    } catch (err) {
        console.log(chalk.red('Connect database fail!', err.message));
    }

    const user = await User.findOne({ username });
    if (user) {
        console.log(chalk.red('The username already exists'));
        return;
    }

    const defaultGroup = await Group.findOne({ isDefault: true });
    if (!defaultGroup) {
        console.log(chalk.red('Default group does not exist'));
        return;
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    let newUser = null;
    try {
        newUser = await User.create({
            username,
            salt,
            password: hash,
            avatar: getRandomAvatar(),
        } as UserDocument);
    } catch (createError) {
        if (createError.name === 'ValidationError') {
            console.log(chalk.red('Username contains unsupported characters or the length exceeds the limit'));
            return;
        }
        console.log(chalk.red('Error:'), createError);
        return;
    }

    if (!defaultGroup.creator) {
        defaultGroup.creator = newUser as UserDocument;
    }
    if (newUser) {
        defaultGroup.members.push(newUser._id);
    }
    await defaultGroup.save();

    console.log(chalk.green('User created successfully'));
}

async function run() {
    const username = process.argv[3];
    const password = process.argv[4];
    await register(username, password);
    process.exit(0);
}
export default run;

/**
 * Register
 */

import bcrypt from 'bcryptjs';
import chalk from 'chalk';

import initMongoDB from '@fiora/database/mongoose/initMongoDB';
import User, { UserDocument } from '../../database/mongoose/models/user';
import Group from '../../database/mongoose/models/group';

import { SALT_ROUNDS } from '../../utils/const';
import getRandomAvatar from '../../utils/getRandomAvatar';

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

    await initMongoDB();

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

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
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
        defaultGroup.creator = newUser._id;
    }
    if (newUser) {
        defaultGroup.members.push(newUser._id);
    }
    await defaultGroup.save();

    console.log(chalk.green('Successfully created user'));
}

async function run() {
    const username = process.argv[3];
    const password = process.argv[4];
    await register(username, password);
    process.exit(0);
}
export default run;

/**
 * 管理局直接创建新用户
 * 通过该方式创建的用户不会加到萌新限制
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { promisify } from 'util';

import User from '../server/models/user';
import Group from '../server/models/group';

import config from '../config/server';
import options from '../utils/commandOptions';
import { saltRounds } from '../utils/const';
import getRandomAvatar from '../utils/getRandomAvatar';

function exitWithError(message: string) {
    console.error(message);
    process.exit(-1);
}

mongoose.Promise = Promise;

mongoose.set('useCreateIndex', true);
mongoose.connect(config.database, { useNewUrlParser: true }, async (err) => {
    if (err) {
        console.error('connect database error!');
        console.error(err);
        return process.exit(-1);
    }

    const { username, password } = options;
    console.log(username, password);
    if (!username) {
        exitWithError('用户名不能为空');
    }
    if (!password) {
        exitWithError('密码不能为空');
    }

    const user = await User.findOne({ username });
    if (user) {
        exitWithError('该用户名已存在');
    }

    const defaultGroup = await Group.findOne({ isDefault: true });
    if (!defaultGroup) {
        exitWithError('默认群组不存在');
    }

    const salt = await promisify(bcrypt.genSalt)(saltRounds);
    const hash = await promisify(bcrypt.hash)(password, salt);

    let newUser = null;
    try {
        newUser = await User.create({
            username,
            salt,
            password: hash,
            avatar: getRandomAvatar(),
        });
    } catch (createError) {
        if (createError.name === 'ValidationError') {
            return exitWithError('用户名包含不支持的字符或者长度超过限制');
        }
        console.error(createError);
        exitWithError('创建新用户失败');
    }

    if (!defaultGroup.creator) {
        defaultGroup.creator = newUser;
    }
    defaultGroup.members.push(newUser);
    await defaultGroup.save();

    console.log('注册成功');

    return process.exit(0);
});

/**
 * 管理局直接创建新用户
 * 通过该方式创建的用户不会加到萌新限制
 */

import bcrypt from 'bcryptjs';

import User, { UserDocument } from '../server/models/user';
import Group from '../server/models/group';

import { saltRounds } from '../utils/const';
import getRandomAvatar from '../utils/getRandomAvatar';
import connectDB from '../server/mongoose';

function exitWithError(message: string) {
    console.error(message);
    process.exit(-1);
}

connectDB()
    .then(async () => {
        const username = process.env.Username || '';
        const password = process.env.Password || '';
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
            });
        } catch (createError) {
            if (createError.name === 'ValidationError') {
                exitWithError('用户名包含不支持的字符或者长度超过限制');
                return;
            }
            console.error(createError);
            exitWithError('创建新用户失败');
        }

        if (!defaultGroup.creator) {
            defaultGroup.creator = newUser as UserDocument;
        }
        if (newUser) {
            defaultGroup.members.push(newUser._id);
        }
        await defaultGroup.save();

        console.log('注册成功');

        process.exit(0);
    })
    .catch((err) => {
        console.error('connect database error!');
        console.error(err);
        return process.exit(-1);
    });

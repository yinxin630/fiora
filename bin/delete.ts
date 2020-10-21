/**
 * 管理局直接创建新用户
 * 通过该方式创建的用户不会加到萌新限制
 */

import User from '../server/models/user';
import Message from '../server/models/message';

import connectDB from '../server/mongoose';

connectDB()
    .then(async () => {
        const time = new Date('2020-10-21 00:00:00').getTime();
        const users = await User.find({
            createTime: {
                $gte: time,
            },
        });
        console.log(`共有 ${users.length} 个今日新注册的用户`);

        console.log('删除这些用户创建的消息');
        const deleteMessageResult = await Message.deleteMany({
            from: {
                $in: users,
            },
        });
        console.log('删除结果:', deleteMessageResult);

        console.log('删除这些用户');
        const deleteUserResult = await User.deleteMany({
            _id: {
                $in: users,
            },
        });
        console.log('删除结果:', deleteUserResult);

        process.exit(0);
    })
    .catch((err) => {
        console.error('connect database error!');
        console.error(err);
        return process.exit(-1);
    });

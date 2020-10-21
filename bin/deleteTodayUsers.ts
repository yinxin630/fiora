/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

/**
 * 删除今日创建的用户, 以及其关联数据
 */

import User from '../server/models/user';
import Message from '../server/models/message';
import Group from '../server/models/group';
import Friend from '../server/models/friend';

import connectDB from '../server/mongoose';

async function deleteUser(userId: string) {
    const user = await User.findOne({ _id: userId });
    if (user) {
        console.log('find user:', user._id, user.username);

        console.log('删除该用户创建的消息');
        const deleteMessageResult = await Message.deleteMany({
            from: user,
        });
        console.log('删除结果:', deleteMessageResult);

        console.log('退出该用户所加入的群组');
        const groups = await Group.find({
            members: user,
        });
        for (const group of groups) {
            console.log('退出', group.name);
            const index = group.members.indexOf(user._id);
            group.members.splice(index, 1);
            if (group.creator.toString() === user._id.toString()) {
                // @ts-ignore
                group.creator = null;
            }
            await group.save();
        }

        console.log('删除与该用户有关的好友关系');
        const deleteFriendResult1 = await Friend.deleteMany({
            from: user,
        });
        const deleteFriendResult2 = await Friend.deleteMany({
            to: user,
        });
        console.log('删除结果:', deleteFriendResult1, deleteFriendResult2);

        console.log('删除该用户');
        const deleteUserResult = await User.deleteMany({
            _id: user._id,
        });
        console.log('删除结果:', deleteUserResult);
    } else {
        console.log('user not exists:', userId);
    }
}

connectDB()
    .then(async () => {
        const now = new Date();
        const time = new Date(
            `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} 00:00:00`,
        ).getTime();
        const users = await User.find({
            createTime: {
                $gte: time,
            },
        });
        console.log(`共有 ${users.length} 个今日新注册的用户`);

        for (const user of users) {
            await deleteUser(user._id.toString());
        }

        process.exit(0);
    })
    .catch((err) => {
        console.error('connect database error!');
        console.error(err);
        return process.exit(-1);
    });

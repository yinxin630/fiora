import chalk from 'chalk';

import connectDB from '../server/mongoose';
import User from '../server/models/user';
import Message from '../server/models/message';
import Group, { GroupDocument } from '../server/models/group';
import Friend from '../server/models/friend';

export async function deleteUser(userId: string) {
    if (!userId) {
        console.log(
            chalk.red('命令错误, 缺少 userId.', chalk.green('eg. yarn script deleteUser [userId]')),
        );
        return;
    }

    try {
        await connectDB();
    } catch (err) {
        console.log(chalk.red('连接数据库失败!', err.message));
    }

    try {
        const user = await User.findOne({ _id: userId });
        if (user) {
            console.log('找到用户:', chalk.blue(user._id.toString()), chalk.green(user.username));

            console.log(chalk.yellow('删除该用户创建的消息'));
            const deleteMessageResult = await Message.deleteMany({
                from: user,
            });
            console.log('删除结果:', deleteMessageResult);

            console.log(chalk.yellow('退出该用户所加入的群组'));
            const groups = await Group.find({
                members: user,
            });
            // eslint-disable-next-line no-inner-declarations
            async function leaveGroup(group: GroupDocument) {
                if (!user) {
                    return;
                }
                console.log('退出', group.name);
                const index = group.members.indexOf(user?._id);
                group.members.splice(index, 1);
                if (group.creator.toString() === user?._id.toString()) {
                    // @ts-ignore
                    group.creator = null;
                }
                await group.save();
            }
            await Promise.all(groups.map(leaveGroup));

            console.log(chalk.yellow('删除与该用户有关的好友关系'));
            const deleteFriendResult1 = await Friend.deleteMany({
                from: user,
            });
            const deleteFriendResult2 = await Friend.deleteMany({
                to: user,
            });
            console.log('删除结果:', deleteFriendResult1, deleteFriendResult2);

            console.log(chalk.yellow('删除该用户'));
            const deleteUserResult = await User.deleteMany({
                _id: user._id,
            });
            console.log('删除结果:', deleteUserResult);

            console.log(chalk.green('删除用户成功!'));
        } else {
            console.log(chalk.red(`用户 [${userId}] 不存在`));
        }
    } catch (err) {
        console.log(chalk.red('删除用户失败!', err.message));
    }
}

async function run() {
    const userId = process.argv[3];
    await deleteUser(userId);
    process.exit(0);
}
export default run;

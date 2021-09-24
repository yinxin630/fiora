/* eslint-disable no-console */
import chalk from 'chalk';

import inquirer from 'inquirer';
import User from '@fiora/database/mongoose/models/user';
import Message from '@fiora/database/mongoose/models/message';
import Group, { GroupDocument } from '@fiora/database/mongoose/models/group';
import Friend from '@fiora/database/mongoose/models/friend';
import History from '@fiora/database/mongoose/models/history';
import initMongoDB, { mongoose } from '@fiora/database/mongoose/initMongoDB';

export async function deleteUser(userIdOrName: string, confirm = true) {
    if (!userIdOrName) {
        console.log(chalk.red('Wrong command, [userIdOrName] is missing.'));
        return;
    }

    await initMongoDB();

    try {
        const user = await User.findOne(
            mongoose.isValidObjectId(userIdOrName)
                ? { _id: userIdOrName }
                : { username: userIdOrName },
        );
        if (user) {
            console.log(
                'Found user:',
                chalk.blue(user._id.toString()),
                chalk.green(user.username),
            );

            if (confirm) {
                const shouldDeleteUser = await inquirer.prompt({
                    type: 'confirm',
                    name: 'result',
                    message: 'Confirm to delete user?',
                });
                if (!shouldDeleteUser.result) {
                    return;
                }
            }

            const messages = await Message.find({ from: user._id });
            const deleteHistoryResult = await History.deleteMany({
                message: {
                    $in: messages.map((message) => message.id),
                },
            });
            console.log('Delete history result:', deleteHistoryResult);

            console.log(chalk.yellow('Delete messages created by this user'));
            const deleteMessageResult = await Message.deleteMany({
                from: user._id,
            });
            console.log('Delete result:', deleteMessageResult);

            console.log(
                chalk.yellow('Leave the group that the user has joined'),
            );
            const groups = await Group.find({
                members: user._id,
            });
            // eslint-disable-next-line no-inner-declarations
            async function leaveGroup(group: GroupDocument) {
                if (!user) {
                    return;
                }
                console.log('Leave', group.name);
                const index = group.members.indexOf(user?._id);
                group.members.splice(index, 1);
                if (group.creator?.toString() === user?._id.toString()) {
                    // @ts-ignore
                    group.creator = null;
                }
                await group.save();
            }
            await Promise.all(groups.map(leaveGroup));

            console.log(
                chalk.yellow(
                    'Delete the friend relationship related to this user',
                ),
            );
            const deleteFriendResult1 = await Friend.deleteMany({
                from: user._id,
            });
            const deleteFriendResult2 = await Friend.deleteMany({
                to: user._id,
            });
            console.log(
                'Delete result:',
                deleteFriendResult1,
                deleteFriendResult2,
            );

            console.log(chalk.yellow('Delete this user'));
            const deleteUserResult = await User.deleteMany({
                _id: user._id,
            });
            console.log('Delete result:', deleteUserResult);

            console.log(chalk.green('Successfully deleted user'));
        } else {
            console.log(chalk.red(`User [${userIdOrName}] does not exist`));
        }
    } catch (err) {
        console.log(chalk.red('Failed to delete user!', err.message));
    }
}

async function run() {
    const userIdOrName = process.argv[3];
    await deleteUser(userIdOrName);
    process.exit(0);
}
export default run;

import chalk from 'chalk';

import inquirer from 'inquirer';
import initMongoDB from '../server/mongoose';
import User from '../server/models/user';
import Message from '../server/models/message';
import Group, { GroupDocument } from '../server/models/group';
import Friend from '../server/models/friend';

export async function deleteUser(userId: string, confirm = true) {
    if (!userId) {
        console.log(
            chalk.red('Wrong command, [userId] is missing.', chalk.green('Usage: yarn script deleteUser [userId]')),
        );
        return;
    }

    await initMongoDB();

    try {
        const user = await User.findOne({ _id: userId });
        if (user) {
            console.log('Found user:', chalk.blue(user._id.toString()), chalk.green(user.username));

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

            console.log(chalk.yellow('Delete messages created by this user'));
            const deleteMessageResult = await Message.deleteMany({
                from: user,
            });
            console.log('Delete result:', deleteMessageResult);

            console.log(chalk.yellow('Leave the group that the user has joined'));
            const groups = await Group.find({
                members: user,
            });
            // eslint-disable-next-line no-inner-declarations
            async function leaveGroup(group: GroupDocument) {
                if (!user) {
                    return;
                }
                console.log('Leave', group.name);
                const index = group.members.indexOf(user?._id);
                group.members.splice(index, 1);
                if (group.creator.toString() === user?._id.toString()) {
                    // @ts-ignore
                    group.creator = null;
                }
                await group.save();
            }
            await Promise.all(groups.map(leaveGroup));

            console.log(chalk.yellow('Delete the friend relationship related to this user'));
            const deleteFriendResult1 = await Friend.deleteMany({
                from: user,
            });
            const deleteFriendResult2 = await Friend.deleteMany({
                to: user,
            });
            console.log('Delete result:', deleteFriendResult1, deleteFriendResult2);

            console.log(chalk.yellow('Delete this user'));
            const deleteUserResult = await User.deleteMany({
                _id: user._id,
            });
            console.log('Delete result:', deleteUserResult);

            console.log(chalk.green('Successfully deleted user'));
        } else {
            console.log(chalk.red(`User [${userId}] does not exist`));
        }
    } catch (err) {
        console.log(chalk.red('Failed to delete user!', err.message));
    }
}

async function run() {
    const userId = process.argv[3];
    await deleteUser(userId);
    process.exit(0);
}
export default run;

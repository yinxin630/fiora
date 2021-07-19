import chalk from 'chalk';
import initMongoDB from '@fiora/database/mongoose/initMongoDB';
import Group from '@fiora/database/mongoose/models/group';

export async function updateDefaultGroupName(newName: string) {
    if (!newName) {
        console.log(
            chalk.red(
                'Wrong command, [newName] is missing.',
                chalk.green('Usage: yarn script updateDefaultGroupName [newName]'),
            ),
        );
        return;
    }

    await initMongoDB();

    const group = await Group.findOne({ isDefault: true });
    if (!group) {
        console.log(chalk.red('Default group does not exist'));
    } else {
        group.name = newName;
        try {
            await group.save();
            console.log(chalk.green('Update default group name success!'));
        } catch (err) {
            console.log(chalk.red('Update default group name fail!'), err.message);
        }
    }
}

async function run() {
    const newName = process.argv[3];
    await updateDefaultGroupName(newName);
    process.exit(0);
}
export default run;

import chalk from 'chalk';
import inquirer from 'inquirer';
import initMongoDB from '../server/mongoose';
import User from '../server/models/user';

export async function fixUsersAvatar() {
    await initMongoDB();

    const users = await User.find({ avatar: { $regex: 'fioraavatar' } });
    if (users.length) {
        console.log(chalk.red('Oh No!'), "Some user's avatar is wrong");
        users.forEach((user) => {
            console.log(user._id, user.username, user.avatar);
        });

        const shouldFix = await inquirer.prompt({
            type: 'confirm',
            name: 'result',
            message: 'Confirm to fix?',
        });
        if (shouldFix.result) {
            await Promise.all(
                users.map((user) => {
                    user.avatar = user.avatar.replace('fioraavatar', 'fiora/avatar');
                    return user.save();
                }),
            );
            console.log(chalk.green('Congratulations! Fixed!'));
        }
    } else {
        console.log(chalk.green('OK!'), "All user's avatar is corrent");
    }
}

async function run() {
    await fixUsersAvatar();
    process.exit(0);
}
export default run;

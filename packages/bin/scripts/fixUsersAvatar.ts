import chalk from 'chalk';
import inquirer from 'inquirer';
import User from '@fiora/database/mongoose/models/user';
import initMongoDB from '@fiora/database/mongoose/initMongoDB';

export async function fixUsersAvatar(
    searchValue: string,
    replaceValue: string,
) {
    searchValue = searchValue || 'fioraavatar';
    replaceValue = replaceValue || 'fiora/avatar';

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
                    user.avatar = user.avatar.replace(
                        searchValue,
                        replaceValue,
                    );
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
    const searchValue = process.argv[3];
    const replaceValue = process.argv[4];
    await fixUsersAvatar(searchValue, replaceValue);
    process.exit(0);
}
export default run;

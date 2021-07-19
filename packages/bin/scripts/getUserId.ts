import chalk from 'chalk';
import User from '@fiora/database/mongoose/models/user';
import initMongoDB from '@fiora/database/mongoose/initMongoDB';

export async function getUserId(username: string) {
    if (!username) {
        console.log(
            chalk.red(
                'Wrong command, [username] is missing.',
                chalk.green('Usage: yarn script getUserId [username]'),
            ),
        );
        return;
    }

    await initMongoDB();

    const user = await User.findOne({ username });
    if (!user) {
        console.log(chalk.red('User does not exist'));
    } else {
        console.log(`The userId of [${username}] is:`, chalk.green(user._id.toString()));
    }
}

async function run() {
    const username = process.argv[3];
    await getUserId(username);
    process.exit(0);
}
export default run;

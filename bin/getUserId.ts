import chalk from 'chalk';
import connectDB from '../server/mongoose';
import User from '../server/models/user';

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

    await connectDB();

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

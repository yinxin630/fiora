import chalk from 'chalk';
import connectDB from '../server/mongoose';
import User from '../server/models/user';

export async function getUserId(username: string) {
    if (!username) {
        console.log(
            chalk.red(
                '命令错误, 缺少 username.',
                chalk.green('eg. yarn script getUserId [username]'),
            ),
        );
        return;
    }

    await connectDB();

    const user = await User.findOne({ username });
    if (!user) {
        console.log(chalk.red('用户不存在'));
    } else {
        console.log(`用户 [${username}] 的 userId 是:`, chalk.green(user._id.toString()));
    }
}

async function run() {
    const username = process.argv[3];
    await getUserId(username);
    process.exit(0);
}
export default run;

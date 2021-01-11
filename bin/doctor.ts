import chalk from 'chalk';
import cp from 'child_process';
import fs from 'fs';
import path from 'path';
import detect from 'detect-port';
import initMongoDB from '../server/mongoose';
import initRedis from '../server/redis';
import server from '../config/server';

console.log(detect);

export async function doctor() {
    console.log(chalk.yellow('===== Run Fiora Docker ====='));

    const nodeVersion = cp.execSync('node --version').toString();
    console.log(chalk.green(`node ${nodeVersion.slice(0, nodeVersion.length - 1)}`));

    await initMongoDB();
    console.log(chalk.green('MongoDB is OK'));

    await (async () => {
        return new Promise(resolve => {
            const redis = initRedis();
            redis.on('connect', resolve)
        })
    })()
    console.log(chalk.green('Redis is OK'));

    const avaliablePort = await detect(server.port);
    if (avaliablePort === server.port) {
        console.log(chalk.green(`Port [${server.port}] is OK`));
    } else {
        console.log(chalk.red(`Port [${server.port}] was occupied`));
    }

    const indexFilePath = path.resolve(__dirname, '../public/index.html');
    const indexFile = fs.readFileSync(indexFilePath);
    if (!indexFile) {
        console.log(chalk.red('Homepage not exists'));
    } else if (indexFile.toString().includes('默认首页')) {
        console.log(chalk.red('Homepage is default. Please build client'));
    } else {
        console.log(chalk.green(`Homepage is OK`));
    }
}

async function run() {
    await doctor();
    process.exit(0);
}
export default run;

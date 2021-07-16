import chalk from 'chalk';
import path from 'path';
import fs from 'fs';

const script = process.argv[2];
if (!script) {
    console.log(chalk.green('没有任何事发生~'));
    process.exit(0);
}

const file = path.resolve(__dirname, `${script}.ts`);
if (!fs.existsSync(file)) {
    console.log(chalk.red(`[${script}] 脚本不存在`));
}

// @ts-ignore
import(file).then((module) => {
    module.default();
});

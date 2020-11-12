import chalk from 'chalk';
import path from 'path';
import fs from 'fs';

const script = process.argv[2];
if (!script) {
    console.log(chalk.green('Nothing happened'));
    process.exit(0);
}

const file = path.resolve(__dirname, script + '.ts');
if (!fs.existsSync(file)) {
    console.log(chalk.red(`Script [${script}] not found`));
}

// @ts-ignore
import(file).then((module) => {
    module.default();
});

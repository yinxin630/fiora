import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import childProcess from 'child_process';

const script = process.argv[2];
if (!script) {
    console.log(chalk.green('Nothing happened'));
    process.exit(0);
}

const file = path.resolve(__dirname, script + '.ts');
if (!fs.existsSync(file)) {
    console.log(chalk.red(`Script [${script}] not found`));
}

childProcess.spawnSync(`npx ts-node -r dotenv/config --transpile-only ${file}`, {
    stdio: 'inherit',
    shell: true,
});

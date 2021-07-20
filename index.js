#!/usr/bin/env node

const { program } = require('commander');
const cp = require('child_process');

function exec(commandStr) {
    const [command, ...args] = commandStr.split(' ');
    cp.execFileSync(command, args, { stdio: 'inherit' });
}

program
    .command('getUserId <username>')
    .description('Get user id by username')
    .action((username) => {
        exec(
            `npx ts-node --transpile-only packages/bin/index.ts getUserId ${username}`,
        );
    });

program
    .command('register <username> <password>')
    .description('Register a new user')
    .action((username, password) => {
        exec(
            `npx ts-node --transpile-only packages/bin/index.ts register ${username} ${password}`,
        );
    });

program
    .command('deleteUser <userId>')
    .description('Delete a user')
    .action((userId) => {
        exec(
            `npx ts-node --transpile-only packages/bin/index.ts deleteUser ${userId}`,
        );
    });

program
    .command('fixUsersAvatar [searchValue] [replaceValue]')
    .description("Fix user's wrong avatar")
    .action((searchValue = '', replaceValue = '') => {
        exec(
            `npx ts-node --transpile-only packages/bin/index.ts fixUsersAvatar ${searchValue} ${replaceValue}`,
        );
    });

program
    .command('deleteTodayRegisteredUsers')
    .description('Delete all newly created users today')
    .action(() => {
        exec(
            `npx ts-node --transpile-only packages/bin/index.ts deleteTodayRegisteredUsers`,
        );
    });

program
    .command('deleteMessages')
    .description('Delete all messages')
    .action(() => {
        exec(
            `npx ts-node --transpile-only packages/bin/index.ts deleteMessages`,
        );
    });

program
    .command('updateDefaultGroupName <newName>')
    .description('Modify the name of the default group')
    .action((newName) => {
        exec(
            `npx ts-node --transpile-only packages/bin/index.ts updateDefaultGroupName ${newName}`,
        );
    });

program
    .command('doctor')
    .description('Run doctor to diagnose environment and configuration issues')
    .action(() => {
        exec(`npx ts-node --transpile-only packages/bin/index.ts doctor`);
    });

program.parse(process.argv);

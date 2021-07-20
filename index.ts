#!/usr/bin/env ts-node

import { program } from 'commander';
import cp from 'child_process';
import i18n from './packages/i18n/node.index';

function exec(commandStr: string) {
    const [command, ...args] = commandStr.split(' ');
    cp.execFileSync(command, args, { stdio: 'inherit' });
}

program
    .command('getUserId <username>')
    .description(i18n('getUserIdDescription'))
    .action((username: string) => {
        exec(
            `npx ts-node --transpile-only packages/bin/index.ts getUserId ${username}`,
        );
    });

program
    .command('register <username> <password>')
    .description(i18n('registerDescription'))
    .action((username: string, password: string) => {
        exec(
            `npx ts-node --transpile-only packages/bin/index.ts register ${username} ${password}`,
        );
    });

program
    .command('deleteUser <userId>')
    .description(i18n('deleteUserDescription'))
    .action((userId: string) => {
        exec(
            `npx ts-node --transpile-only packages/bin/index.ts deleteUser ${userId}`,
        );
    });

program
    .command('fixUsersAvatar [searchValue] [replaceValue]')
    .description(i18n('fixUsersAvatarDescription'))
    .action((searchValue = '', replaceValue = '') => {
        exec(
            `npx ts-node --transpile-only packages/bin/index.ts fixUsersAvatar ${searchValue} ${replaceValue}`,
        );
    });

program
    .command('deleteTodayRegisteredUsers')
    .description(i18n('deleteTodayRegisteredUsersDescription'))
    .action(() => {
        exec(
            `npx ts-node --transpile-only packages/bin/index.ts deleteTodayRegisteredUsers`,
        );
    });

program
    .command('deleteMessages')
    .description(i18n('deleteMessagesDescription'))
    .action(() => {
        exec(
            `npx ts-node --transpile-only packages/bin/index.ts deleteMessages`,
        );
    });

program
    .command('updateDefaultGroupName <newName>')
    .description(i18n('updateDefaultGroupNameDescription'))
    .action((newName: string) => {
        exec(
            `npx ts-node --transpile-only packages/bin/index.ts updateDefaultGroupName ${newName}`,
        );
    });

program
    .command('doctor')
    .description(i18n('doctorDescription'))
    .action(() => {
        exec(`npx ts-node --transpile-only packages/bin/index.ts doctor`);
    });

program.usage('[command]');

program.parse(process.argv);

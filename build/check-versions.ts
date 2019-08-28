/* eslint-disable import/no-extraneous-dependencies */

import chalk from 'chalk';
import semver from 'semver';
import cp from 'child_process';

import packageJson from '../package.json';

function exec(cmd) {
    return cp.execSync(cmd).toString().trim();
}

const versionRequirements = [
    {
        name: 'node',
        currentVersion: semver.clean(process.version),
        versionRequirement: packageJson.engines.node,
    },
    {
        name: 'npm',
        currentVersion: exec('npm --version'),
        versionRequirement: packageJson.engines.npm,
    },
];

(() => {
    const warnings = [];
    for (let i = 0; i < versionRequirements.length; i++) {
        const mod = versionRequirements[i];
        if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
            warnings.push(`${mod.name}: ${chalk.red(mod.currentVersion)} should be ${chalk.green(mod.versionRequirement)}`);
        }
    }

    if (warnings.length) {
        console.log('');
        console.log(chalk.yellow('To use this template, you must update following to modules:'));
        console.log();
        for (let i = 0; i < warnings.length; i++) {
            const warning = warnings[i];
            console.log(`  ${warning}`);
        }
        console.log();
        process.exit(1);
    }
})();

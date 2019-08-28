/* eslint-disable import/no-extraneous-dependencies */
import './check-versions';

import ora from 'ora';
import rm from 'rimraf';
import path from 'path';
import chalk from 'chalk';
import webpack from 'webpack';
import config from '../config/webpack';
import webpackConfig from './webpack.prod.conf';

process.env.NODE_ENV = 'production';

const spinner = ora('building for production...');
spinner.start();

rm(path.join(config.build.assetsRoot), (err) => {
    if (err) throw err;
    webpack(webpackConfig, (wErr, stats) => {
        spinner.stop();
        if (wErr) throw wErr;
        process.stdout.write(`${stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false,
        })}\n\n`);

        console.log(chalk.cyan('  Build complete.\n'));
        console.log(chalk.yellow('  Tip: built files are meant to be served over an HTTP server.\n  Opening index.html over file:// won\'t work.\n'));
    });
});

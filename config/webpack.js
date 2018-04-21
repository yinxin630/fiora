const path = require('path');
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
    { name: 'publicPath', type: String },
    { name: 'subDirectory', type: String },
];
const options = commandLineArgs(optionDefinitions);

module.exports = {
    commonn: {
        convertPxToRem: {
            enable: false,
            options: {
                rootValue: 108, // 设计稿为3倍图
                propList: ['*', '!border'],
                unitPrecision: 4,
                replace: true,
            },
        },
        autoPrefix: {
            enable: true,
            options: {
                browsers: ['last 3 versions'],
            },
        },
    },
    build: {
        env: {
            NODE_ENV: '"production"',
        },
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist/fiora'),
        assetsSubDirectory: options.subDirectory || '.',
        assetsPublicPath: options.publicPath || '/',
        productionSourceMap: false,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report,
    },
    dev: {
        env: {
            NODE_ENV: '"development"',
        },
        host: 'localhost',
        port: 8080,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        cssSourceMap: false,
    },
};

import path from 'path';
import options from '../utils/commandOptions';

const { env } = process;

function getFirstNotUndefined(...values) {
    for (let i = 0; i < values.length; i++) {
        if (values[i] !== undefined) {
            return values[i];
        }
    }
    return null;
}

export default {
    commonn: {
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
        assetsSubDirectory: getFirstNotUndefined(options.subDirectory, env.SubDirectory, '.'),
        assetsPublicPath: getFirstNotUndefined(options.publicPath, env.PublicPath, '/'),
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
        autoOpenBrowser: false,
        assetsSubDirectory: '.',
        assetsPublicPath: '/',
        proxyTable: {},
        cssSourceMap: false,
    },
};

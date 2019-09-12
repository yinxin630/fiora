import path from 'path';
import options from '../utils/commandOptions';

/**
 * 该文件还会在客户端环境执行, 用结构赋值的方式会取不到值
 * 因为客户端是基于文本匹配替换的值
 */
// eslint-disable-next-line prefer-destructuring
const env = process.env;

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
        assetsPublicPath: '',
        proxyTable: {},
        cssSourceMap: false,
    },
};

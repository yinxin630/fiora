import path from 'path';
import * as utils from './utils';
import config from '../config/webpack';
import pages from '../config/pages';

const entry = {};
pages.forEach((page) => {
    entry[page.entry.key] = page.entry.file;
});

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

export default {
    entry,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[hash:8].js'),
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        alias: {
            '@': resolve('client'),
            root: resolve(''),
            utils: resolve('utils'),
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'ts-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 4000,
                    name: utils.assetsPath('img/[name].[hash:8].[ext]'),
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 5000,
                    name: utils.assetsPath('fonts/[name].[hash:8].[ext]'),
                },
            },
            {
                test: /\.(mp3)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 5000,
                    name: utils.assetsPath('audio/[name].[hash:8].[ext]'),
                },
            },
        ],
    },
};

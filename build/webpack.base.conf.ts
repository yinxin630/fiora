/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import webpack from 'webpack';
import humps from 'humps';
import * as utils from './utils';
import config from './webpack';
import pages from './pages';
import client from '../config/client';

const clientConfigKeys = Object.keys(client).map((key) => humps.decamelize(key).toUpperCase());

const entry: { [key: string]: string } = {};
pages.forEach((page) => {
    entry[page.entry.key] = page.entry.file;
});

function resolve(dir: any) {
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
                    {
                        loader: 'linaria/loader',
                        options: {
                            sourceMap: process.env.NODE_ENV !== 'production',
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
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
    plugins: [
        // @ts-ignore
        new webpack.DefinePlugin({
            'process.env': Object.keys(process.env)
                .filter((key) => clientConfigKeys.includes(key))
                .reduce((result: any, key) => {
                    result[key] = JSON.stringify(process.env[key]);
                    return result;
                }, {}),
        }),
    ],
};

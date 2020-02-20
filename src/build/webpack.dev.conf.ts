/* eslint-disable import/no-extraneous-dependencies */

import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import DashboardPlugin from 'webpack-dashboard/plugin';

import * as utils from './utils';
import config from '../config/webpack';
import baseWebpackConfig from './webpack.base.conf';
import pages from '../config/pages';

const htmlPlugins = pages.map((page) => new HtmlWebpackPlugin(page));

Object.keys(baseWebpackConfig.entry).forEach((name) => {
    baseWebpackConfig.entry[name] = ['react-hot-loader/patch', './build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

export default merge(baseWebpackConfig, {
    mode: 'development',
    output: {
        publicPath: config.dev.assetsPublicPath,
    },
    module: {
        rules: utils.getStyleLoaders(),
    },
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        // @ts-ignore
        new webpack.DefinePlugin({
            'process.env': config.dev.env,
        }),
        // @ts-ignore
        new webpack.HotModuleReplacementPlugin(),
        // @ts-ignore
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin(),
        new DashboardPlugin(),
        ...htmlPlugins,
    ],
});

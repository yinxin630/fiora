/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const utils = require('./utils');
const config = require('../config/webpack');
const baseWebpackConfig = require('./webpack.base.conf');
const pages = require('../config//pages');

const htmlPlugins = pages.map((page) => new HtmlWebpackPlugin(page));

Object.keys(baseWebpackConfig.entry).forEach((name) => {
    baseWebpackConfig.entry[name] = ['react-hot-loader/patch', './build/dev-client'].concat(baseWebpackConfig.entry[name]);
});

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    output: {
        publicPath: config.dev.assetsPublicPath,
    },
    module: {
        rules: utils.getStyleLoaders(),
    },
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin(),
        ...htmlPlugins,
    ],
});

/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin';
import ScriptExtHtmlPlugin from 'script-ext-html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import * as utils from './utils';
import config from '../config/webpack';
import baseWebpackConfig from './webpack.base.conf';
import pages from '../config/pages';

const htmlPlugins = pages.map((page) => (
    new HtmlWebpackPlugin(Object.assign(page, {
        chunks: ['vendor', 'manifest', ...page.chunks],
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
        },
        chunksSortMode: 'dependency',
    }))
));

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        publicPath: config.build.assetsPublicPath,
    },
    module: {
        rules: utils.getStyleLoaders(),
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             vendor: {
    //                 test: module => /node_modules/.test(module.context),
    //                 chunks: 'initial',
    //                 name: 'vendor',
    //                 enforce: true,
    //             },
    //         },
    //     },
    // },
    plugins: [
        // @ts-ignore
        new webpack.DefinePlugin({
            'process.env': config.build.env,
        }),
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[hash:8].css'),
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true,
            },
        }),
        // @ts-ignore
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: '',
                ignore: ['.*'],
            },
        ]),
        ...htmlPlugins,
        new ScriptExtHtmlPlugin({
            custom: [
                {
                    test: /\.js$/,
                    attribute: 'crossorigin',
                    value: 'anonymous',
                },
            ],
        }),
    ],
});

if (config.build.bundleAnalyzerReport) {
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

export default webpackConfig;

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const ScriptExtHtmlPlugin = require('script-ext-html-webpack-plugin');

const utils = require('./utils');
const config = require('../config/webpack');
const baseWebpackConfig = require('./webpack.base.conf');
const pages = require('../config//pages');

const htmlPlugins = pages.map(page => (
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
    module: {
        rules: utils.getStyleLoaders(),
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: module => /node_modules/.test(module.context),
                    chunks: 'initial',
                    name: 'vendor',
                    enforce: true,
                },
            },
        },
    },
    plugins: [
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
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.build.assetsSubDirectory,
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

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin');

    webpackConfig.plugins.push(new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(`\\.(${config.build.productionGzipExtensions.join('|')})$`),
        threshold: 10240,
        minRatio: 0.8,
    }));
}

if (config.build.bundleAnalyzerReport) {
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;

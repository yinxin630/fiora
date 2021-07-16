const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    output: {
        publicPath: '/',
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        contentBase: ['./dist', './public'],
        historyApiFallback: {
            rewrites: [
                { from: /\/invite\/group\/[\w\d]+/, to: '/index.html' },
            ],
        },
    },
    plugins: [new ReactRefreshWebpackPlugin()],
});

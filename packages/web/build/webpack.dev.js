const path = require('path');
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
        contentBase: ['./dist'],
        historyApiFallback: {
            rewrites: [{ from: /\/invite\/group\/[\w\d]+/, to: '/index.html' }],
        },
        proxy: {
            '/avatar': 'http://localhost:9200',
            '/GroupAvatar': 'http://localhost:9200',
            '/Avatar': {
                target: 'http://localhost:9200',
                pathRewrite: { '^/Avatar': '/avatar' },
            },
            '/favicon-*.png': 'http://localhost:9200',
        },
    },
    plugins: [new ReactRefreshWebpackPlugin()],
});

var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/client/index.js',
    output: { path: './public', filename: 'app.js' },
    module: {
        loaders: [
            {
                test: /\.js|\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0', 'react'],
                }
            },
            {
                test: /\.(css)$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
            }
        ]
    },
};
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: './src/client/webMobile/index.js',
    output: { path: './public', filename: 'app.mobile.js' },
    module: {
        loaders: [
            {
                test: /\.js|\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0', 'react'],
                },
            },
            {
                test: /\.(css)$/,
                loaders: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'postcss-loader', 'resolve-url', 'sass-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
            },
            {
                test: /\.svg/,
                loader: 'svg-url-loader',
            },
        ],
    },
    postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
};

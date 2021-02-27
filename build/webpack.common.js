const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');
const Dotenv = require('dotenv-webpack');

const clientConfigKeys = [
    'NODE_ENV',
    'MaxImageSize',
    'MaxBackgroundImageSize',
    'MaxAvatarSize',
    'DefaultTheme',
    'Sound',
    'TagColorMode',
    'FrontendMonitorAppId',
];

const publicPath = process.env.PublicPath || '/';

module.exports = {
    entry: {
        app: path.resolve(__dirname, '../client/main.tsx'),
    },
    output: {
        filename: '[name].[chunkhash:8].js',
        path: path.resolve(__dirname, '../dist/fiora'),
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
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
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                ...(process.env.NODE_ENV === 'development'
                                    ? [require.resolve('react-refresh/babel')]
                                    : []),
                            ],
                        },
                    },
                    {
                        loader: 'linaria/loader',
                        options: {
                            sourceMap: false,
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: {
                                localIdentName: '[local]--[hash:base64:5]',
                            },
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                plugins: [
                                    new LessPluginAutoPrefix({
                                        enable: true,
                                        options: {
                                            browsers: ['last 3 versions'],
                                        },
                                    }),
                                ],
                            },
                            sourceMap: false,
                        },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 4096,
                    name: '[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 4096,
                    name: '[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.(mp3)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 4096,
                    name: '[name].[hash:8].[ext]',
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                ...Object.keys(process.env)
                    .filter((key) => clientConfigKeys.includes(key))
                    .reduce((result, key) => {
                        result[key] = JSON.stringify(process.env[key]);
                        return result;
                    }, {}),
                PublicPath: JSON.stringify(publicPath),
            },
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../client/templates/index.html'),
            inject: true,
        }),
        new CleanWebpackPlugin(),
        new Dotenv({
            silent: true,
        }),
    ],
};

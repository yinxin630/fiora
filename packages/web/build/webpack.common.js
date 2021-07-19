const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        app: path.resolve(__dirname, '../src/main.tsx'),
    },
    output: {
        filename: 'js/[name].[chunkhash:8].js',
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
                    name: 'images/[name].[ext]',
                    esModule: false,
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 4096,
                    name: 'fonts/[name].[hash:8].[ext]',
                    esModule: false,
                },
            },
            {
                test: /\.(mp3)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 4096,
                    name: 'audios/[name].[hash:8].[ext]',
                    esModule: false,
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/template.html'),
            inject: true,
        }),
        new CleanWebpackPlugin(),
        new Dotenv({
            silent: true,
        }),
    ],
};

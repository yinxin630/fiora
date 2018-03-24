const path = require('path');
const config = require('../config');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.assetsPath = (_path) => {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory;
    return path.posix.join(assetsSubDirectory, _path);
};

exports.getStyleLoaders = () => {
    const rules = [{
        test: /\.less$/,
    }];
    const loaders = ['css-loader'];

    if (config.commonn.convertPxToRem.enable) {
        loaders.push({
            loader: 'pxrem-loader',
            options: config.commonn.convertPxToRem.options,
        });
    }
    if (config.commonn.autoPrefix.enable) {
        loaders.push({
            loader: 'less-loader',
            options: {
                plugins: [
                    new LessPluginAutoPrefix(config.commonn.autoPrefix.options),
                ],
            },
        });
    } else {
        loaders.push('less-loader');
    }
    if (process.env.NODE_ENV === 'production') {
        rules[0].use = ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: loaders,
        });
    } else {
        loaders.unshift('style-loader');
        rules[0].use = loaders;
    }
    return rules;
};

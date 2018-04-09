const path = require('path');
const config = require('../config/webpack');
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
        use: ['css-loader'],
    }, {
        test: /\.css$/,
        use: ['css-loader'],
    }];

    if (config.commonn.convertPxToRem.enable) {
        rules[0].use.push({
            loader: 'pxrem-loader',
            options: config.commonn.convertPxToRem.options,
        });
    }
    if (config.commonn.autoPrefix.enable) {
        rules[0].use.push({
            loader: 'less-loader',
            options: {
                plugins: [
                    new LessPluginAutoPrefix(config.commonn.autoPrefix.options),
                ],
            },
        });
    } else {
        rules[0].use.push('less-loader');
    }
    if (process.env.NODE_ENV === 'production') {
        rules[0].use = ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: rules[0].use,
        });
        rules[1].use = ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: rules[1].use,
        });
    } else {
        rules[0].use.unshift('style-loader');
        rules[1].use.unshift('style-loader');
    }
    return rules;
};

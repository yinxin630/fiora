/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';

import LessPluginAutoPrefix from 'less-plugin-autoprefix';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import config from '../config/webpack';

export function assetsPath(_path) {
    return path.posix.join('', _path);
}

const cssLoader = {
    loader: 'css-loader',
    options: {
        importLoaders: 2,
        modules: {
            localIdentName: '[local]--[hash:base64:5]',
        },
    },
};

export function getStyleLoaders() {
    const rules = [{
        test: /\.less$/,
        use: [cssLoader],
    }, {
        test: /\.css$/,
        use: ['css-loader'],
    }];

    if (config.commonn.autoPrefix.enable) {
        rules[0].use.push({
            loader: 'less-loader',
            options: {
                // @ts-ignore
                plugins: [
                    new LessPluginAutoPrefix(config.commonn.autoPrefix.options),
                ],
            },
        });
    } else {
        // @ts-ignore
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
        // @ts-ignore
        rules[0].use.unshift('style-loader');
        // @ts-ignore
        rules[1].use.unshift('style-loader');
    }
    return rules;
}

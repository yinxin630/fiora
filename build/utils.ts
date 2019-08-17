/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';

import LessPluginAutoPrefix from 'less-plugin-autoprefix';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import config from '../config/webpack';

export function assetsPath(_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.build.assetsSubDirectory
        : config.dev.assetsSubDirectory;
    return path.posix.join(assetsSubDirectory, _path);
}

const cssLoader = {
    loader: 'css-loader',
    options: {
        modules: true,
        /**
         * 为了兼容之前没有用 css module 的代码, 暂时不能设置为 [name]__[local]--[hash:base64:5]
         * [local] 其实就是原本的名称
         */
        localIdentName: '[local]',
    },
};

export function getStyleLoaders() {
    const rules = [{
        test: /\.less$/,
        use: [cssLoader],
    }, {
        test: /\.css$/,
        use: [cssLoader],
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

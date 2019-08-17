/* eslint-disable import/no-extraneous-dependencies */
import './check-versions';

import opn from 'opn';
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import proxyMiddleware from 'http-proxy-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import connectionHistoryApiFallback from 'connect-history-api-fallback';

import config from '../config/webpack';
import webpackConfig from './webpack.dev.conf';

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

const host = process.env.HOST || config.dev.host;
const port = process.env.PORT || config.dev.port;
const autoOpenBrowser = !!config.dev.autoOpenBrowser;
const { proxyTable } = config.dev;

const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
    logLevel: 'error',
});

const hotMiddleware = webpackHotMiddleware(compiler, {
    log: () => { },
});


compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
        if (cb) {
            cb();
        }
    });
});

Object.keys(proxyTable).forEach((context) => {
    let options = proxyTable[context];
    if (typeof options === 'string') {
        options = { target: options };
    }
    app.use(proxyMiddleware(options.filter || context, options));
});

app.use(connectionHistoryApiFallback());

app.use(devMiddleware);

app.use(hotMiddleware);

const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

const uri = `http://${host}:${port}`;

devMiddleware.waitUntilValid(() => {
    console.log(`> Listening at ${uri}\n`);
});

// @ts-ignore
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }

    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri);
    }
});

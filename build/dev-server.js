require('./check-versions')();
const config = require('../config/webpack');

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

const opn = require('opn');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const webpackConfig = require('./webpack.dev.conf');

const host = process.env.HOST || config.dev.host;
const port = process.env.PORT || config.dev.port;
const autoOpenBrowser = !!config.dev.autoOpenBrowser;
const { proxyTable } = config.dev;

const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
    logLevel: 'error',
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
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

app.use(require('connect-history-api-fallback')());

app.use(devMiddleware);

app.use(hotMiddleware);

const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

const uri = `http://${host}:${port}`;

devMiddleware.waitUntilValid(() => {
    console.log(`> Listening at ${uri}\n`);
});

module.exports = app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }

    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri);
    }
});

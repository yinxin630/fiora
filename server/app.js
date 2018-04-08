const Koa = require('koa');
const IO = require('koa-socket');
const koaSend = require('koa-send');
const koaStatic = require('koa-static');
const path = require('path');

const enhanceContext = require('./middlewares/enhanceContext.js');
const log = require('./middlewares/log');
const route = require('./middlewares/route');
const catchError = require('./middlewares/catchError');

const userRoutes = require('./routes/user');

const Socket = require('./models/socket');

const app = new Koa();

// 将前端路由指向 index.html
app.use(async (ctx, next) => {
    if (!/\./.test(ctx.request.url)) {
        await koaSend(
            ctx,
            'index.html',
            {
                root: path.join(__dirname, '../public'),
                maxage: 1000 * 60 * 60 * 24 * 7,
                gzip: true,
            } // eslint-disable-line
        );
    } else {
        await next();
    }
});


// 静态文件访问
app.use(koaStatic(
    path.join(__dirname, '../public'),
    {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        gzip: true,
    } // eslint-disable-line
));

const io = new IO({
    ioOptions: {
        pingTimeout: 10000,
        pingInterval: 5000,
    },
});

// 注入应用
io.attach(app);

app._io.origins([
    'fiora.suisuijiang.com:80',
    'fiora.suisuijiang.com:443',
    'localhost:8080',
    '127.0.0.1:8080',
]);


// 中间件
io.use(enhanceContext());
io.use(log());
io.use(catchError());
io.use(route(
    app.io,
    Object.assign({}, userRoutes),
));

app.io.on('connection', async (ctx) => {
    await Socket.create({
        id: ctx.socket.id,
    });
    console.log(`  <<<< connection ${ctx.socket.id} ${ctx.socket.request.connection.remoteAddress}`);
});
app.io.on('disconnect', async (ctx) => {
    await Socket.remove({
        id: ctx.socket.id,
    });
    console.log(`  >>>> disconnect ${ctx.socket.id}`);
});

module.exports = app;

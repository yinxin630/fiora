const Koa = require('koa');
const IO = require('koa-socket');
const koaSend = require('koa-send');
const koaStatic = require('koa-static');
const path = require('path');

const enhanceContext = require('./middlewares/enhanceContext.js');
const log = require('./middlewares/log');
const route = require('./middlewares/route');

const userRoutes = require('./routes/user');

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

const io = new IO();

// 注入应用
io.attach(app);

// 中间件
io.use(enhanceContext());
io.use(log());
io.use(route(
    app.io,
    Object.assign({}, userRoutes),
));

io.use(async (ctx, next) => {
    await next();
    ctx.res = { msg: '111' };
});

app.io.on('connection', async () => {
    // console.log('connection');
    // await Socket.create({
    //     socket: ctx.socket.id,
    // });
});
app.io.on('disconnect', async () => {
    // console.log('disconnect');
    // await Socket.remove({
    //     socket: ctx.socket.id,
    // });
});

module.exports = app;

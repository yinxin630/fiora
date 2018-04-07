const Koa = require('koa');
const IO = require('koa-socket');
const koaSend = require('koa-send');
const koaStatic = require('koa-static');
const path = require('path');

// const addMethods = require('./middlewares/addMethods');
// const log = require('./middlewares/log');
// const close = require('./middlewares/close');
// const notFound = require('./middlewares/notFound');
// const police = require('./middlewares/police');
// const catchError = require('./middlewares/catchError');

// const policeConfig = require('./polices/index');

// const Socket = require('./models/socket');

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
// io.use(catchError());
// io.use(close());
// io.use(log());
// io.use(addMethods(app.io, app._io));
// io.use(police(policeConfig));


io.use(async (ctx, next) => {
    console.log('middleware start');
    console.log(ctx);
    await next;
    console.log('middleware end');
});

// 注册路由
// applyRoutes(io);

// 必须放在 applyRoutes 后面
// io.use(notFound());

app.io.on('connection', async () => {
    console.log('connection');
    // await Socket.create({
    //     socket: ctx.socket.id,
    // });
});
app.io.on('disconnect', async () => {
    console.log('disconnect');
    // await Socket.remove({
    //     socket: ctx.socket.id,
    // });
});

// 不能去掉下面这行
app.io.on('message', async (ctx) => {
    console.log(ctx.data);
    console.log('in message');
    ctx.acknowledge({ msg: 'good' });
});

module.exports = app;

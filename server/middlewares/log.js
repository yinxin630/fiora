const chalk = require('chalk');

module.exports = function () {
    return async (ctx, next) => {
        console.log(`  ${chalk.gray('<--')} ${chalk.white(ctx.data.method)} ${chalk.blue(ctx.data.path)}`);
        const before = Date.now();

        await next();

        const after = Date.now();
        let color = 'green';
        const { status } = ctx.resData;
        if (status >= 100 && status < 200) {
            color = 'white';
        } else if (status >= 200 && status < 300) {
            color = 'green';
        } else if (status >= 300 && status < 400) {
            color = 'cyan';
        } else if (status >= 400 && status < 500) {
            color = 'red';
        } else if (status >= 500) {
            color = 'magenta';
        }
        console.log(`  ${chalk.gray('-->')} ${chalk[color](ctx.resData.status)} ${chalk.yellow(`${after - before}ms`)} ${status >= 500 ? ctx.resData.data : ''}`);
    };
};

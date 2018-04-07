const app = require('./app');
const config = require('../config/server');

app.listen(config.port, async () => {
    console.log(` >>> server listen on http://localhost:${config.port}`);
});

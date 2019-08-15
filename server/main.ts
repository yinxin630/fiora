const mongoose = require('mongoose');

const checkVersion = require('../build/check-versions');

checkVersion(); // 检查node.js和npm版本

const app = require('./app');
const config = require('../config/server');

const Socket = require('./models/socket');
const Group = require('./models/group');
const getRandomAvatar = require('../utils/getRandomAvatar');

// @ts-ignore
global.mdb = new Map(); // 作为内存数据库使用
// @ts-ignore
global.mdb.set('sealList', new Set()); // 封禁用户列表
// @ts-ignore
global.mdb.set('newUserList', new Set()); // 新注册用户列表

mongoose.Promise = Promise;

mongoose.set('useCreateIndex', true);
mongoose.connect(config.database, { useNewUrlParser: true }, async (err) => {
    if (err) {
        console.error('connect database error!');
        console.error(err);
        return process.exit(1);
    }

    // 判断默认群是否存在, 不存在就创建一个
    const group = await Group.findOne({ isDefault: true });
    if (!group) {
        const defaultGroup = await Group.create({
            name: config.defaultGroupName,
            avatar: getRandomAvatar(),
            isDefault: true,
        });
        if (!defaultGroup) {
            console.error('create default group fail');
            return process.exit(1);
        }
    } else if (group.name !== config.defaultGroupName) {
        group.name = config.defaultGroupName;
        await group.save();
    }

    app.listen(config.port, async () => {
        await Socket.deleteMany({}); // 删除Socket表所有历史数据
        console.log(` >>> server listen on http://localhost:${config.port}`);
    });

    return null;
});

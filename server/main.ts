import mongoose from 'mongoose';

import app from './app';

import config from '../config/server';

import Socket from './models/socket';
import Group from './models/group';
import getRandomAvatar from '../utils/getRandomAvatar';

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

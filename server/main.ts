import initMongoDB from './mongoose';
import app from './app';

import config from '../config/server';

import Socket from './models/socket';
import Group, { GroupDocument } from './models/group';
import getRandomAvatar from '../utils/getRandomAvatar';
import { doctor } from '../bin/doctor';
import logger from './utils/logger';

(async () => {
    if (process.argv.find((argv) => argv === '--doctor')) {
        await doctor();
    }

    await initMongoDB();

    // 判断默认群是否存在, 不存在就创建一个
    const group = await Group.findOne({ isDefault: true });
    if (!group) {
        const defaultGroup = await Group.create({
            name: 'fiora',
            avatar: getRandomAvatar(),
            isDefault: true,
        } as GroupDocument);

        if (!defaultGroup) {
            logger.error('[defaultGroup]', 'create default group fail');
            return process.exit(1);
        }
    }

    app.listen(config.port, async () => {
        await Socket.deleteMany({}); // 删除Socket表所有历史数据
        logger.debug(`>>> server listen on http://localhost:${config.port}`);
    });

    return null;
})();

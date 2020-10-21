/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

/**
 * 清洗群组数据
 */

import User from '../server/models/user';
import Group from '../server/models/group';

import connectDB from '../server/mongoose';

connectDB()
    .then(async () => {
        const groups = await Group.find({});
        for (const group of groups) {
            const members = [];
            for (const userId of group.members) {
                const user = await User.findOne({ _id: userId });
                if (user) {
                    members.push(user._id);
                } else {
                    console.log('用户不存在:', userId);
                }
            }
            console.log(
                `清洗 [${group.name}] 群组结果: before=${group.members.length} after=${members.length}`,
            );
            group.members = members;
            await group.save();
        }

        process.exit(0);
    })
    .catch((err) => {
        console.error('connect database error!');
        console.error(err);
        return process.exit(-1);
    });

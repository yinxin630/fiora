const assert = require('assert');
const bluebird = require('bluebird');
const bcrypt = bluebird.promisifyAll(require('bcrypt'), { suffix: '$' });

const User = require('../models/user');
const Group = require('../models/group');
const error = require('../../utils/error');

const saltRounds = 10;

module.exports = {
    register: async (ctx) => {
        const { username, password } = ctx.params;
        assert(!username, { code: error.UsernameCannotBeNull });
        assert(!password, { code: error.PasswordCannotBeNull });

        const user = await User.findOne({ username });
        assert(user, { code: error.UsernameAlreadyExist });

        const defaultGroup = await Group.findOne({ isDefault: true });
        assert(!defaultGroup, { code: error.DefaultGroupNotExist });

        const salt = await bcrypt.genSalt$(saltRounds);
        const hash = await bcrypt.hash$(password, salt);

        try {
            const newUser = await User.create({
                username,
                salt,
                password: hash,
                groups: [defaultGroup],
            });
            defaultGroup.members.push(newUser);
            await defaultGroup.save();
            return newUser;
        } catch (err) {
            assert.equal(err.message, 'User validation failed', { code: error.UsernameIllegal });
        }
    },
    login: async (ctx) => {
        console.log('响应', ctx);
        return { msg: 'login success' };
    },
};

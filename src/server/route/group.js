const assert = require('../util/assert');
const User = require('../model/user');
const Group = require('../model/group');
const isLogin = require('../police/isLogin');

const GroupRoute = {
    'POST /group': function* (socket, data, end) {
        yield* isLogin(socket, data, end);
        assert(!data.name, end, 400, 'need name param but not exists');

        const user = yield User.findById(socket.user);
        const newGroup = new Group({
            name: data.name,
            creator: user,
            members: [user],
        });

        let savedGroup = null;
        try {
            savedGroup = yield newGroup.save();
            user.groups.push(savedGroup);
            yield user.save();
        }
        catch (err) {
            if (err.code === 11000) {
                return end(400, { msg: `name:'${data.name}' already exists` });
            }
            else if (err.message === 'Group validation failed') {
                return end(400, { msg: `name:'${data.name}' invalid` });
            }
            console.log('save new group error ->', err);
            return end(500, { msg: 'server error when save new group' });
        }
        end(201, savedGroup);
    },
    'DELETE /group': function* (socket, data, end) {
        yield end(200, { });
    },
    'GET /group': function* (socket, data, end) {
        yield end(200, { });
    },
    'PUT /group': function* (socket, data, end) {
        yield end(200, { });
    },
};

module.exports = GroupRoute;

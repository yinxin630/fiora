const assert = require('../util/assert');
const User = require('../model/user');
const Group = require('../model/group');
const isLogin = require('../police/isLogin');
const mongoose = require('mongoose');

const GroupRoute = {
    'POST /group': function* (socket, data, end) {
        yield* isLogin(socket, data, end);
        assert(!data.name, end, 400, 'need name param but not exists');

        const ownedGroup = yield Group.find({ creator: socket.user });
        console.log(ownedGroup);
        assert(ownedGroup.length > 1, end, 400, 'every one can create only one group');

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

        const groupOpts = [
            {
                path: 'members',
                select: {
                    _id: true,
                    avatar: true,
                    username: true,
                },
            },
        ];
        yield Group.populate(savedGroup, groupOpts);
        yield Group.populate(savedGroup, { path: 'creator', select: '_id username' });
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
    'PUT /group/announcement': function* (socket, data, end) {
        yield* isLogin(socket, data, end);
        assert(!data.content, end, 400, 'need content param but not exists');
        assert(!data.groupId, end, 400, 'need groupId param but not exists');
        assert(!mongoose.Types.ObjectId.isValid(data.groupId), end, 400, `groupId:'${data.groupId}' is invalid`);

        const group = yield Group.findById(data.groupId);
        if (!group) {
            return end(400, { msg: 'group not exists' });
        }
        if (group.creator.toString() !== socket.user) {
            return end(401, { msg: 'you are not creator of this group' });
        }

        const user = yield User.findById(socket.user);

        group.announcement = data.content;
        group.announcementPublisher = user.username;
        group.announcementTime = Date.now();

        yield group.save();

        yield end(201, group);
    },
};

module.exports = GroupRoute;

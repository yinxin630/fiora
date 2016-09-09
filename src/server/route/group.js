const mongoose = require('mongoose');

const assert = require('../util/assert');
const User = require('../model/user');
const Group = require('../model/group');
const isLogin = require('../police/isLogin');
const saveImage = require('../util/saveImage');

const GroupRoute = {
    'POST /group': function* (data) {
        yield* isLogin(this.socket, data, this.end);
        assert(!data.name, this.end, 400, 'need name param but not exists');

        const ownedGroup = yield Group.find({ creator: this.socket.user });
        assert(ownedGroup.length > 1, this.end, 400, 'every one can create only one group');

        const user = yield User.findById(this.socket.user);
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
                return this.end(400, { msg: `name:'${data.name}' already exists` });
            }
            else if (err.message === 'Group validation failed') {
                return this.end(400, { msg: `name:'${data.name}' invalid` });
            }
            console.log('save new group error ->', err);
            return this.end(500, { msg: 'server error when save new group' });
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
        this.end(201, savedGroup);
    },

    'POST /group/members': function* (data) {
        yield* isLogin(this.socket, data, this.end);
        assert(!data.groupName, this.end, 400, 'need groupName param but not exists');

        const group = yield Group.findOne({ name: data.groupName });
        assert(!group, this.end, 400, `group: ${data.groupName} not exists`);

        const user = yield User.findById(this.socket.user);

        try {
            if (user.groups.indexOf(group._id) === -1) {
                user.groups.push(group);
                yield user.save();
            }
            else {
                return this.end(400, { msg: 'you already join this group' });
            }
            if (group.members.indexOf(user._id) === -1) {
                group.members.push(user);
                yield group.save();
            }
            else {
                return this.end(400, { msg: 'you already join this group' });
            }
        }
        catch (err) {
            console.log('add user to group error ->', err);
            return this.end(500, { msg: 'server error when add user to group' });
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
        yield Group.populate(group, groupOpts);
        yield Group.populate(group, { path: 'creator', select: '_id username' });
        this.end(201, group);
    },

    'PUT /group/announcement': function* (data) {
        yield* isLogin(this.socket, data, this.end);
        assert(!data.content, this.end, 400, 'need content param but not exists');
        assert(!data.groupId, this.end, 400, 'need groupId param but not exists');
        assert(!mongoose.Types.ObjectId.isValid(data.groupId), this.end, 400, `groupId:'${data.groupId}' is invalid`);

        const group = yield Group.findById(data.groupId);
        if (!group) {
            return this.end(400, { msg: 'group not exists' });
        }
        if (group.creator.toString() !== this.socket.user) {
            return this.end(401, { msg: 'you are not creator of this group' });
        }

        const user = yield User.findById(this.socket.user);

        group.announcement = data.content;
        group.announcementPublisher = user.username;
        group.announcementTime = Date.now();

        yield group.save();

        return this.end(201, group);
    },
    'PUT /group/avatar': function* (data) {
        yield* isLogin(this.socket, data, this.end);
        assert(!data.avatar, this.end, 400, 'need avatar param but not exists');
        assert(!data.groupId, this.end, 400, 'need groupId param but not exists');
        assert(!mongoose.Types.ObjectId.isValid(data.groupId), this.end, 400, `groupId:'${data.groupId}' is invalid`);

        const group = yield Group.findById(data.groupId);
        if (!group) {
            return this.end(400, { msg: 'group not exists' });
        }
        if (group.creator.toString() !== this.socket.user) {
            return this.end(401, { msg: 'you are not creator of this group' });
        }

        const fileName = `group_${group._id}_${Date.now().toString()}.${data.avatar.match(/data:image\/(.+);base64/)[1]}`;
        group.avatar = yield* saveImage(fileName, data.avatar);
        yield group.save();

        return this.end(201, group);
    },
};

module.exports = GroupRoute;

const assert = require('../util/assert');
const promise = require('bluebird');
const Group = require('../model/group');
const mongoose = require('mongoose');
const isLogin = require('../police/isLogin');

const group = {
    'POST /group': function* (socket, data, end) {
        assert(!data.name, end, 400, 'need name param but not exists');

        let newGroup = new User({
            name: data.name,
        });

        let savedGroup = null;
        try {
            savedGroup = yield newGroup.save();
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
        end(200, { });
    },
    'GET /group': function* (socket, data, end) {
        end(200, { });
    },
    'PUT /group': function* (socket, data, end) {
        end(200, { });
    }
}

module.exports = group;
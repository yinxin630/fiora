const assert = require('../util/assert');
const promise = require('bluebird');
const User = require('../model/user');
const Group = require('../model/group');
const mongoose = require('mongoose');
const isLogin = require('../police/isLogin');

const message = {
    'POST /message': function* (socket, data, end) {
        yield* isLogin(socket, data, end);
        


        end(200, { });
    }
}

module.exports = message;
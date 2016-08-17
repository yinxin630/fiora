const user = {
    'POST /user': function* (data, end) {
        end(200, { });
    },
    'GET /user': function* (data, end) {
        end(200, { });
    },
    'GET /user/me': function* (data, end) {
        end(200, { });
    },
    'POST /user/friend': function* (data, end) {
        end(200, { });
    },
    ,'DELETE /user/friend': function* (data, end) {
        end(200, { });
    }
    ,'POST /user/group': function* (data, end) {
        end(200, { });
    },
    'DELETE /user/group': function* (data, end) {
        end(200, { });
    }
}

module.exports = user;
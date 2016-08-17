const auth = {
    'POST /auth': function* (data, end) {
        end(200, { });
    },
    'DELETE /auth': function* (data, end) {
        end(200, { });
    }
}

module.exports = auth;
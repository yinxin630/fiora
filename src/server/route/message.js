const message = {
    'POST /message': function* (socket, data, end) {
        end(200, { });
    }
}

module.exports = message;
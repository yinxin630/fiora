const message = {
    'POST /message': function* (data, end) {
        end(200, { });
    }
}

module.exports = message;
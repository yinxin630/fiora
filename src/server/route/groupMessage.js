const groupMessage = {
    'POST /groupMessage': function* (socket, data, end) {
        end(200, { });
    }
}

module.exports = groupMessage;
const jwt = require('jwt-simple');
const config = require('../../../config/config');
const assert = require('../util/assert');

function* isLogin(socket, data, end) {
    assert(!data.token, end, 403, 'neen token param but not exists');

    let payload = null;
    try {
        payload = jwt.decode(data.token, config.jwtSecret);
    }
    catch (err) {
        if (err.message === 'Signature verification failed') {
            return end(403, 'invalid token');
        }
        console.log(err.message);
        return end(500, 'server error when run police isLogin');
    }

    assert(payload.ip !== socket.handshake.address, end, 403, 'your ip not same as token payload ip');
    assert(payload.expires < Date.now(), 403, 'token expires over');

    socket.user = payload.userId;
    yield;
}

module.exports = isLogin;

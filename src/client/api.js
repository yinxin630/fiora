import socket from './socket';

window.getOnlineCount = function (cb) {
    socket.get('/auth/count', { }, cb);
};


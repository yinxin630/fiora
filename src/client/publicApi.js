import socket from './socket';

const api = {
    getOnlineCount: function (cb) {
        socket.get('/auth/count', { }, cb);
    },
};

export default api;

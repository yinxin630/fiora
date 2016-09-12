import socket from './socket';

const api = {
    getOnlineCount: function (cb) {
        socket.get('/auth/count', { }, response => {
            cb(null, response.data.onlineCount);
        });
    },
};

export default api;

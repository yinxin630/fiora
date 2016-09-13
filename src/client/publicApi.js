import socket from './socket';

const api = {
    apis: {
        getApis: 'get api list. params( cb )',
        getOnlineCount: 'get online user count. params( cb )',
        sendMessage: 'send message. params( linkmanType, linkmanId, messageType, content, cb )',
    },
    getApis: function (cb) {
        cb(null, this.apis);
    },
    getOnlineCount: function (cb) {
        socket.get('/auth/count', { }, response => {
            cb(null, response.data.onlineCount);
        });
    },
    sendMessage: function (linkmanType, linkmanId, messageType, content, cb) {
        if (linkmanType === 'group') {
            socket.post('/groupMessage', { linkmanId, type: messageType, content }, response => {
                if (response.status !== 201) {
                    return cb(response.data, null);
                }
                cb(null, response.data);
            });
        }
        else if (linkmanType === 'stranger') {
            socket.post('/message', { linkmanId, type: messageType, content }, response => {
                if (response.status !== 201) {
                    return cb(response.data, null);
                }
                cb(null, response.data);
            });
        }
        else {
            cb('invalid linkman type', null);
        }
    },
};

export default api;

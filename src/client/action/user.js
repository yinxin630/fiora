import Store from '../store';
import socket from '../socket';

const dispatch = Store.dispatch;

const actions = {
    online: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'Online',
            });
            resolve('success');
        });
    },

    offline: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'Offline',
            });
            resolve('success');
        });
    },

    login: function (username, password) {
        return new Promise(resolve => {
            socket.post('/auth', { username, password }, response => {
                if (response.status === 201) {
                    dispatch({
                        type: 'LoginSuccess',
                        user: response.data.user,
                    });
                    socket.setToken(response.data.token);
                    resolve(response);
                }
                else {
                    resolve(response);
                }
            });
        });
    },

    signup: function (username, password) {
        return new Promise(resolve => {
            socket.post('/user', { username, password }, response => {
                resolve(response);
            });
        });
    },

    reConnect: function (token) {
        socket.setToken(token);
        return new Promise(resolve => {
            socket.post('/auth/re', { }, response => {
                if (response.status === 201) {
                    dispatch({
                        type: 'LoginSuccess',
                        user: response.data,
                    });
                    resolve(response);
                }
                else {
                    resolve(response);
                }
            });
        });
    },

    sendGroupMessage: function (linkmanId, type, content) {
        return new Promise(resolve => {
            socket.post('/groupMessage', { linkmanId, type, content }, response => {
                if (response.status === 201) {
                    dispatch({
                        type: 'AddGroupMessage',
                        message: response.data,
                    });
                    resolve(response);
                }
                else {
                    resolve(response);
                }
            });
        });
    },

    addGroupMessage: function (message) {
        return new Promise(resolve => {
            dispatch({
                type: 'AddGroupMessage',
                message: message,
            });
            resolve(message);
        });
    },

    clearUnread: function (linkmanType, linkmanId) {
        return new Promise(resolve => {
            dispatch({
                type: 'ClearUnread',
                linkmanType,
                linkmanId,
            });
            resolve('success');
        });
    },

    createGroup: function (name) {
        return new Promise(resolve => {
            socket.post('/group', { name: name }, response => {
                if (response.status === 201) {
                    dispatch({
                        type: 'CreateGroup',
                        user: response.data,
                    });
                    resolve(response);
                }
                else {
                    resolve(response);
                }
            });
        });
    },

    updateGroupAnnouncement: function (groupId, content) {
        return new Promise(resolve => {
            socket.put('/group/announcement', { groupId, content }, response => {
                if (response.status === 201) {
                    dispatch({
                        type: 'UpdateGroupAnnouncement',
                        group: response.data,
                    });
                    resolve(response);
                }
                else {
                    resolve(response);
                }
            });
        });
    },
};

export default actions;

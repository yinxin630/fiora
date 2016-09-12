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

    logout: function () {
        return new Promise(resolve => {
            socket.delete('/auth', { }, response => {
                if (response.status === 204) {
                    socket.setToken('');
                    resolve(response);
                }
                else {
                    resolve(response);
                }
            });
        });
    },

    init: function () {
        return new Promise(resolve => {
            dispatch({
                type: 'Initialize',
            });
            resolve('success');
        });
    },

    signup: function (username, password) {
        return new Promise(resolve => {
            socket.post('/user', { username, password }, response => {
                resolve(response);
            });
        });
    },

    updateAvatar: function (avatar) {
        return new Promise(resolve => {
            socket.put('/user/avatar', { avatar }, response => {
                if (response.status === 200) {
                    dispatch({
                        type: 'UpdateAvatar',
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

    reConnect: function (token) {
        if (token) {
            socket.setToken(token);
        }
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

    joinGroup: function (groupName) {
        return new Promise(resolve => {
            socket.post('/group/members', { groupName }, response => {
                if (response.status === 201) {
                    dispatch({
                        type: 'JoinGroup',
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

    updateGroupAvatar: function (groupId, avatar) {
        return new Promise(resolve => {
            socket.put('/group/avatar', { groupId, avatar }, response => {
                if (response.status === 201) {
                    dispatch({
                        type: 'UpdateGroupAvatar',
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

    addUserLinkman: function (user) {
        return new Promise(resolve => {
            dispatch({
                type: 'AddUserLinkman',
                user,
            });
            resolve('success');
        });
    },

    sendMessage: function (linkmanId, type, content) {
        return new Promise(resolve => {
            socket.post('/message', { linkmanId, type, content }, response => {
                if (response.status === 201) {
                    dispatch({
                        type: 'SendMessage',
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

    addMessage: function (message) {
        return new Promise(resolve => {
            dispatch({
                type: 'AddMessage',
                message: message,
            });
            resolve(message);
        });
    },

    getGroupInfo: function (groupId) {
        return new Promise(resolve => {
            socket.get('/group', { groupId }, response => {
                if (response.status === 200) {
                    dispatch({
                        type: 'GetGroupInfo',
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

    addUserExpression: function (src) {
        return new Promise(resolve => {
            socket.post('/user/expression', { src }, response => {
                console.log(response);
                if (response.status === 201) {
                    dispatch({
                        type: 'AddUserExpression',
                        expressions: response.data,
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

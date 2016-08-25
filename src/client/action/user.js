import Store from '../store';
const dispatch = Store.dispatch;
import socket from '../socket';

const actions = {
    login: function(username, password) {
        return new Promise(resolve => {
            socket.post('/auth', { username, password }, response => {
                if (response.status === 201) {
                    dispatch({
                        type: 'LoginSuccess',
                        user: response.data.user
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

    signup: function(username, password) {
        return new Promise(resolve => {
            socket.post('/user', { username, password }, response => {
                resolve(response);
            });
        });
    },

    reConnect: function(token) {
        socket.setToken(token);
        return new Promise(resolve => {
            socket.post('/auth/re', { }, response => {
                if (response.status === 201) {
                    dispatch({
                        type: 'LoginSuccess',
                        user: response.data
                    });
                    resolve(response);
                }
                else {
                    resolve(response);
                }
            });
        });
    },

    sendGroupMessage: function(linkmanId, content) {
        return new Promise(resolve => {
            socket.post('/groupMessage', { linkmanId, content }, response => {
                console.log('post group message ->', response);
                if (response.status === 201) {
                    dispatch({
                        type: 'SendGroupMessageSuccess',
                        message: response.data
                    });
                    resolve(response);
                }
                else {
                    resolve(response);
                }
            });
        });
    },

    createGroup: function(name) {
        return new Promise(resolve => {
            socket.post('/group', { name: name }, response => {
                if (response.status === 201) {
                    dispatch({
                        type: 'createGroup',
                        user: response.data
                    });
                    resolve(response);
                }
                else {
                    resolve(response);
                }
            });
        });
    }
};

export default actions;
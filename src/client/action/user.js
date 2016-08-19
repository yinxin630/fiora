import Store from '../store';
const dispatch = Store.dispatch;
import socketClient from 'socket.io-client';
import Socket from '../util/socket';

const socket = new Socket(socketClient('http://localhost:9200'));

const actions = {
    login: function(username, password) {
        return new Promise(resolve => {
            socket.post('/auth', { username, password }, response => {
                if (response.status === 201) {
                    dispatch({
                        type: 'LoginSuccess',
                        user: response.data.user
                    });
                    dispatch({
                        type: 'LoginSuccess'
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
                    dispatch({
                        type: 'LoginSuccess'
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
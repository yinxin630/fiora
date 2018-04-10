import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import platform from 'platform';

import App from './App';
import store from './state/store';
import action from './state/action';
import socket from './socket';

socket.on('connect', () => {
    const token = window.localStorage.getItem('token');
    if (token) {
        socket.emit('loginByToken', {
            token,
            os: platform.os.family,
            browser: platform.name,
            environment: platform.description,
        }, (res) => {
            if (typeof res === 'object') {
                action.setUser(res);
                action.getGroupsLastMessages();
                action.connect();
            }
        });
    } else {
        socket.emit('guest', {
            os: platform.os.family,
            browser: platform.name,
            environment: platform.description,
        }, (res) => {
            if (typeof res === 'object') {
                action.setGuest(res);
                action.getDefaultGroupMessages();
            }
        });
    }
});
socket.on('disconnect', () => {
    action.disconnect();
});
socket.on('message', (data) => {
    console.log('收到消息', data);
});

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'),
);

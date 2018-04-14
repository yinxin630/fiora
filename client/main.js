import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import platform from 'platform';

import App from './App';
import store from './state/store';
import action from './state/action';
import socket from './socket';
import notification from '../utils/notification';

if (window.Notification && (window.Notification.permission === 'default' || window.Notification.permission === 'denied')) {
    window.Notification.requestPermission();
}

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
socket.on('message', (message) => {
    action.addGroupMessage(message.toGroup, message);
    const state = store.getState();
    const group = state.getIn(['user', 'groups']).find(g => g.get('_id') === message.toGroup);
    notification(
        `${message.from.username} 在 ${group.get('name')} 对大家说:`,
        message.from.avatar,
        message.content,
        message.toGroup._id,
    );
});

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'),
);

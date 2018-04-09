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
                action.connect();
            }
        });
    }
});
socket.on('disconnect', () => {
    action.disconnect();
});

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'),
);

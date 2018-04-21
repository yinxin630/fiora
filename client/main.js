import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import platform from 'platform';

import fetch from 'utils/fetch';
import App from './App';
import store from './state/store';
import action from './state/action';
import socket from './socket';
import notification from '../utils/notification';
import sound from '../utils/sound';
import getFriendId from '../utils/getFriendId';

if (window.Notification && (window.Notification.permission === 'default' || window.Notification.permission === 'denied')) {
    window.Notification.requestPermission();
}

async function guest() {
    const [err, res] = await fetch('guest', {
        os: platform.os.family,
        browser: platform.name,
        environment: platform.description,
    });
    if (!err) {
        action.setGuest(res);
    }
}

socket.on('connect', async () => {
    const token = window.localStorage.getItem('token');
    if (token) {
        const [err, res] = await fetch('loginByToken', {
            token,
            os: platform.os.family,
            browser: platform.name,
            environment: platform.description,
        }, { toast: false });
        if (err) {
            guest();
        } else {
            action.setUser(res);
        }
    } else {
        guest();
    }
});
socket.on('disconnect', () => {
    action.disconnect();
});
socket.on('message', (message) => {
    const state = store.getState();
    const linkman = state.getIn(['user', 'linkmans']).find(l => l.get('_id') === message.to);
    let title = '';
    if (linkman) {
        action.addLinkmanMessage(message.to, message);
        if (linkman.get('type') === 'group') {
            title = `${message.from.username} 在 ${linkman.get('name')} 对大家说:`;
        } else {
            title = `${message.from.username} 对你说:`;
        }
    } else {
        const newLinkman = {
            _id: getFriendId(
                state.getIn(['user', '_id']),
                message.from._id,
            ),
            type: 'temporary',
            createTime: Date.now(),
            avatar: message.from.avatar,
            name: message.from.username,
            messages: [],
            unread: 1,
        };
        action.addLinkman(newLinkman);
        title = `${message.from.username} 对你说:`;

        fetch('getLinkmanHistoryMessages', { linkmanId: newLinkman._id }).then(([err, res]) => {
            if (!err) {
                action.addLinkmanMessages(newLinkman._id, res);
            }
        });
    }

    notification(
        title,
        message.from.avatar,
        message.type === 'text' ? message.content : `[${message.type}]`,
        message.to,
    );

    const soundType = state.getIn(['ui', 'sound']);
    sound(soundType);
});

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'),
);

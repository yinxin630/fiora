/* eslint-disable import/first */
if (
    (window.location.protocol === 'https:' || window.location.hostname === 'localhost')
    && navigator.serviceWorker
) {
    window.addEventListener('load', () => {
        const sw = process.env.NODE_ENV === 'development' ? '/static/fiora-sw.js' : '/fiora-sw.js';
        navigator.serviceWorker.register(sw);
    });
}

import 'babel-polyfill';

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
import convertMessage from '../utils/convertMessage';
import voice from '../utils/voice';

if (window.Notification && (window.Notification.permission === 'default' || window.Notification.permission === 'denied')) {
    window.Notification.requestPermission();
}

let windowStatus = 'focus';
window.onfocus = () => windowStatus = 'focus';
window.onblur = () => windowStatus = 'blur';


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

let prevFrom = '';
let prevName = '';
socket.on('message', (message) => {
    convertMessage(message);

    const state = store.getState();
    const isSelfMessage = message.from._id === state.getIn(['user', '_id']);
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
        // 联系人不存在并且是自己发的消息, 不创建新联系人
        if (isSelfMessage) {
            return;
        }
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

    if (windowStatus === 'blur' && state.getIn(['ui', 'notificationSwitch'])) {
        notification(
            title,
            message.from.avatar,
            message.type === 'text' ? message.content.replace(/&lt;/g, '<').replace(/&gt;/g, '>') : `[${message.type}]`,
            Math.random(),
        );
    }

    if (state.getIn(['ui', 'soundSwitch'])) {
        const soundType = state.getIn(['ui', 'sound']);
        sound(soundType);
    }

    if (state.getIn(['ui', 'voiceSwitch'])) {
        if (message.type === 'text') {
            const text = message.content
                .replace(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g, '')
                .replace(/#/g, '');

            if (text.length > 100) {
                return;
            }

            const from = linkman && linkman.get('type') === 'group' ?
                `${message.from.username}${linkman.get('name') === prevName ? '' : `在${linkman.get('name')}`}说`
                :
                `${message.from.username}对你说`;
            if (text) {
                voice.push(from !== prevFrom ? from + text : text, message.from.username);
            }
            prevFrom = from;
            prevName = linkman.get('name');
        } else if (message.type === 'system') {
            voice.push(message.from.originUsername + message.content);
            prevFrom = null;
        }
    }
});

socket.on('changeGroupName', ({ groupId, name }) => {
    action.setGroupName(groupId, name);
});

socket.on('deleteGroup', ({ groupId }) => {
    action.removeLinkman(groupId);
});

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'),
);

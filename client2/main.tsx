import 'babel-polyfill';

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import platform from 'platform';

import App from './App';
import store from './state/store';
import getData from './localStorage';
import setCssVariable from '../utils/setCssVariable';
import socket from '../client/socket';
import { loginByToken, guest, getLinkmansLastMessages, getDefalutGroupHistoryMessages } from './service';
import { ActionTypes } from './state/action';
import getFriendId from '../utils/getFriendId';

// 注册 Service Worker
if (
    (window.location.protocol === 'https:' || window.location.hostname === 'localhost')
    && navigator.serviceWorker
) {
    window.addEventListener('load', () => {
        const sw = process.env.NODE_ENV === 'development' ? '/static/fiora-sw.js' : '/fiora-sw.js';
        navigator.serviceWorker.register(sw);
    });
}

// 更新 css variable
const { primaryColor, primaryTextColor } = getData();
setCssVariable(primaryColor, primaryTextColor);

// 请求 Notification 授权
if (
    Notification
    && (Notification.permission === 'default' || Notification.permission === 'denied')
) {
    Notification.requestPermission();
}

const { dispatch } = store;

async function loginFailback() {
    const defaultGroup = await guest(platform.os.family, platform.name, platform.description);
    if (defaultGroup) {
        dispatch({
            type: ActionTypes.SetGuest,
            payload: defaultGroup,
        });
        const messages = await getDefalutGroupHistoryMessages(0);
        dispatch({
            type: ActionTypes.AddLinkmanMessages,
            payload: {
                linkmanId: defaultGroup._id,
                messages,
            },
        });
    }
}

socket.on('connect', async () => {
    const token = window.localStorage.getItem('token');
    if (token) {
        const user = await loginByToken(
            token,
            platform.os.family,
            platform.name,
            platform.description,
        );
        if (user) {
            dispatch({
                type: ActionTypes.SetUser,
                payload: user,
            });
            const linkmanIds = [
                ...user.groups.map((group) => group._id),
                ...user.friends.map((friend) => getFriendId(friend.from, friend.to._id)),
            ];
            const linkmanMessages = await getLinkmansLastMessages(linkmanIds);
            dispatch({
                type: ActionTypes.SetLinkmansLastMessages,
                payload: linkmanMessages,
            });
            return null;
        }
    }
    loginFailback();
    return null;
});

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'),
);

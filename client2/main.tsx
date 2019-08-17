import 'babel-polyfill';

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './state/store';
import getData from './localStorage';
import setCssVariable from '../utils/setCssVariable';

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
if (Notification && (Notification.permission === 'default' || Notification.permission === 'denied')) {
    Notification.requestPermission();
}

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'),
);

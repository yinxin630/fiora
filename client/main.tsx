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
    (window.location.protocol === 'https:')
    && navigator.serviceWorker
) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/fiora-sw.js');
    });
}

// 更新 css variable
const { primaryColor, primaryTextColor } = getData();
setCssVariable(primaryColor, primaryTextColor);

// 请求 Notification 授权
if (
    window.Notification
    && (window.Notification.permission === 'default' || window.Notification.permission === 'denied')
) {
    window.Notification.requestPermission();
}

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'),
);

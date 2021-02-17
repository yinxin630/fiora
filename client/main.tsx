/* eslint-disable camelcase */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './state/store';
import getData from './localStorage';
import setCssVariable from '../utils/setCssVariable';
import config from '../config/client';

// 注册 Service Worker
if (window.location.protocol === 'https:' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register(`/service-worker.js`);
    });
}

// 如果配置了前端监控, 动态加载并启动监控
if (config.frontendMonitorAppId) {
    // @ts-ignore
    import(/* webpackChunkName: "frontend-monitor" */ 'wpk-reporter').then((module) => {
        const WpkReporter = module.default;

        const __wpk = new WpkReporter({
            bid: config.frontendMonitorAppId,
            spa: true,
            rel: config.frontendMonitorAppId,
            uid: () => localStorage.getItem('username') || '',
            plugins: [],
        });

        __wpk.installAll();
    });
}

// 更新 css variable
const { primaryColor, primaryTextColor } = getData();
setCssVariable(primaryColor, primaryTextColor);

// 请求 Notification 授权
if (
    window.Notification &&
    (window.Notification.permission === 'default' || window.Notification.permission === 'denied')
) {
    window.Notification.requestPermission();
}

if (window.location.pathname !== '/') {
    const { pathname } = window.location;
    window.history.pushState({}, 'fiora', '/');
    if (pathname.startsWith('/invite/group/')) {
        const groupId = pathname.replace(`/invite/group/`, '');
        window.sessionStorage.setItem('inviteGroupId', groupId);
    }
}

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'),
);

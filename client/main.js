import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './state/store';
import socket from './socket';

socket.emit('message', { a: 1, b: 2 }, (res) => {
    console.log(res);
});

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'),
);

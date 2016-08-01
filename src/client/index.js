import React from 'react';
import ReactDom from 'react-dom';
import App from './app';
import Store from './store';
import { Provider, connect } from 'react-redux';

ReactDom.render(
    <Provider store={ Store }>
        <App/>
    </Provider>,
    document.querySelector('#app')
);
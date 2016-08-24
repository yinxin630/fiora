import React from 'react';
import ReactDom from 'react-dom';
import Store from './store';
import { Provider, connect } from 'react-redux';
import { Router, Route, browerHistory, hashHistory } from 'react-router';

import App from './app';
import Login from './component/login';

ReactDom.render(
    <Provider store={ Store }>
        <Router history={ hashHistory }>
            <Route path="/" component={ App }>
                <Route path="login" component={ Login }/>
            </Route>
        </Router>
    </Provider>,
    document.querySelector('#app')
);
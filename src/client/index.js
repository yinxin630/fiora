import React from 'react';
import ReactDom from 'react-dom';
import Store from './store';
import { Provider, connect } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './app';
import Login from './module/login/login';
import Signup from './module/signup/signup';
import Chat from './module/chat/chat';

ReactDom.render(
    <Provider store={ Store }>
        <Router history={ hashHistory }>
            <Route path="/" component={ App }>
                <IndexRoute component={ Login }/>
                <Route path="login" component={ Login }/>
                <Route path="signup" component={ Signup }/>
                <Route path="chat/:type/:id" component={ Chat }/>
                <Route path="chat" component={ Chat }/>
            </Route>
        </Router>
    </Provider>,
    document.querySelector('#app')
);
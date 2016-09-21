import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Store from '../store';

import App from './app';
import Login from './login/login';
import Linkman from './linkman/linkman';

ReactDom.render(
    <Provider store={Store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Login} />
                <Route path="login" component={Login} />
                <Route path="linkman" component={Linkman} />
            </Route>
        </Router>
    </Provider>,
    document.querySelector('#app')
);

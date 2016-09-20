import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Store from '../store';

import App from './app';
import Login from '../webPc/login/login';
import Signup from '../webPc/signup/signup';
import Main from '../webPc/main/main';
import Chat from '../webPc/main/chat/chat';
import GroupManage from '../webPc/main/linkmanManage/groupManage';

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}
// requires and returns all modules that match
requireAll(require.context('../plugins/', true, /^\.\/.*\.js$/));

ReactDom.render(
    <Provider store={Store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Login} />
                <Route path="login" component={Login} />
                <Route path="signup" component={Signup} />
                <Route path="main" component={Main}>
                    <IndexRoute component={Chat} />
                    <Route path="chat" component={Chat} />
                    <Route path="chat/:type/:id" component={Chat} />
                    <Route path="manage" component={GroupManage} />
                </Route>
            </Route>
        </Router>
    </Provider>,
    document.querySelector('#app')
);

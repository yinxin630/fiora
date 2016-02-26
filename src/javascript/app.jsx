'use strict'

const React = require('react');
const ReactDom = require('react-dom');
import { Provider, connect } from 'react-redux';
const Action = require('./action.js');
const Store = require('./store.js');
import { Router, Route, Link } from 'react-router';
const socketIOClient = require('socket.io-client');
const sailsIOClient = require('sails.io.js');
const io = sailsIOClient(socketIOClient);

import Header from './header.jsx';
import Body from './body.jsx';
import Register from './register.jsx';
import Login from './login.jsx';

io.sails.url = 'http://localhost:1337';

export default class App extends React.Component {
    render() {
        const { dispatch } = this.props;
        const { user, linkmans, linkmanFocus } = this.props.reducer;
        return (
            <div style={{
                height: window.innerHeight,
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Header/>
                <Body
                    user={ user } 
                    linkmans={ linkmans }
                    linkmanFocus={ linkmanFocus }
                    linkmanClick={ index => dispatch(Action.setLinkmanFocus(index)) }
                />
            </div>
        );
    }
}

const ConnectedApp = connect(state => state)(App);

ReactDom.render(
    <Provider store={ Store }>
        <Router>
            <Route path="/" component={ ConnectedApp }/>
            <Route path="/register" component={ Register }/>
            <Route path="/login" component={ Login }/>
        </Router>
    </Provider>, 
    document.querySelector('#app')
);
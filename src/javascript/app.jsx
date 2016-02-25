'use strict'

const React = require('react');
const ReactDom = require('react-dom');
import { Provider, connect } from 'react-redux';
const Action = require('./action.js');
const Store = require('./store.js');
import { Router, Route, Link } from 'react-router';

import Header from './header.jsx';
import Body from './body.jsx';

export default class App extends React.Component {
    render() {
        const { user, linkmans } = this.props.reducer;
        return (
            <div style={{
                height: window.innerHeight,
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Header/>
                <Body/>
            </div>
        );
    }
}

const ConnectedApp = connect(state => state)(App);

ReactDom.render(
    <Provider store={ Store }>
        <Router>
            <Route path="/" component={ ConnectedApp }/>
        </Router>
    </Provider>, 
    document.querySelector('#app')
);
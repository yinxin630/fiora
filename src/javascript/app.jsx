'use strict'

const React = require('react');
const ReactDom = require('react-dom');
import { Provider, connect } from 'react-redux';
import { store } from './store.js';
import { Router, Route, Link } from 'react-router';
import Header from './header.jsx';

export default class App extends React.Component {
    render() {
        return (
            <div style={{
                backgroundColor: 'yellow',
                height: window.innerHeight,
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Header/>
            </div>
        );
    }
}

const ConnectedApp = connect(state => state)(App);

ReactDom.render(
    <Provider store={ store }>
        <Router>
            <Route path="/" component={ ConnectedApp }/>
        </Router>
    </Provider>, 
    document.querySelector('#app')
);
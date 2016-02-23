'use strict'

const React = require('react');
const ReactDom = require('react-dom');
import { Provider, connect } from 'react-redux';
import { store } from './store.js';

export default class App extends React.Component {
    render() {
        return (
            <div>
                hello world
            </div>
        );
    }
}

const ConnectedApp = connect(state => state)(App);

ReactDom.render(
    <Provider store={ store }>
        <ConnectedApp/>
    </Provider>, 
    document.querySelector('#app')
);
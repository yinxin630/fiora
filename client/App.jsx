import React, { Component } from 'react';
import 'normalize.css';

import { hot } from 'react-hot-loader';
import Main from './modules/main/Main';

import './styles/app.less';

// App can't be stateless component
class App extends Component {
    render() {
        return (
            <div className="app">
                <Main />
            </div>
        );
    }
}

export default hot(module)(App);

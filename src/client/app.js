import React from 'react';
import './style/app.scss';

import { connect } from 'react-redux';

import Header from './component/header';
import Body from './component/body';
import MaskLayout from './component/maskLayout';

import Login from './component/login';

class App extends React.Component {
    render () {
        const { isLogin } = this.props;
        return (
            <div className="window">
                <div className="background"></div>
                {
                    isLogin ?
                    <div className="app">
                        <Header/>
                        <Body/>
                        <MaskLayout/>
                    </div>
                    :
                    <Login/>
                }
            </div>
        );
    }
}

export default connect(
    state => ({
        isLogin: state.ui.isLogin
    })
)(App);
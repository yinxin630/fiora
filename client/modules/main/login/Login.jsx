import React, { Component } from 'react';
import autobind from 'autobind-decorator';

import socket from '@/socket';
import { Tabs, TabPane, TabContent, ScrollableInkTabBar } from '@/components/Tabs';
import Input from '@/components/Input';
import './Login.less';

class Login extends Component {
    @autobind
    handleLogin() {
        console.log('登录');
        console.log(this.username.getValue(), this.password.getValue());
    }
    @autobind
    handleRegister() {
        socket.emit(
            'register',
            { username: this.username.getValue(), password: this.password.getValue() },
            (newUser) => {
                console.log(newUser);
            },
        );
    }
    renderLogin() {
        return (
            <div className="pane">
                <h3>用户名</h3>
                <Input ref={i => this.username = i} />
                <h3>密码</h3>
                <Input type="password" ref={i => this.password = i} />
                <button onClick={this.handleLogin}>登录</button>
            </div>
        );
    }
    renderRegister() {
        return (
            <div className="pane">
                <h3>用户名</h3>
                <Input ref={i => this.username = i} />
                <h3>密码</h3>
                <Input type="password" ref={i => this.password = i} />
                <button onClick={this.handleRegister}>注册</button>
            </div>
        );
    }
    render() {
        return (
            <Tabs
                className="main-login"
                defaultActiveKey="login"
                renderTabBar={() => <ScrollableInkTabBar />}
                renderTabContent={() => <TabContent />}
            >
                <TabPane tab="登录" key="login">
                    {this.renderLogin()}
                </TabPane>
                <TabPane tab="注册" key="register">
                    {this.renderRegister()}
                </TabPane>
            </Tabs>
        );
    }
}

export default Login;

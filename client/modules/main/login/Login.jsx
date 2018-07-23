import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import platform from 'platform';

import socket from '@/socket';
import action from '@/state/action';
import { Tabs, TabPane, TabContent, ScrollableInkTabBar } from '@/components/Tabs';
import Input from '@/components/Input';
import Message from '@/components/Message';
import './Login.less';

class Login extends Component {
    @autobind
    handleLogin() {
        socket.emit('login', {
            username: this.loginUsername.getValue(),
            password: this.loginPassword.getValue(),
            os: platform.os.family,
            browser: platform.name,
            environment: platform.description,
        }, (res) => {
            if (typeof res === 'string') {
                Message.error(res);
            } else {
                action.setUser(res);
                action.closeLoginDialog();
                window.localStorage.setItem('token', res.token);
            }
        });
    }
    @autobind
    handleRegister() {
        socket.emit('register', {
            username: this.registerUsername.getValue(),
            password: this.registerPassword.getValue(),
            os: platform.os.family,
            browser: platform.name,
            environment: platform.description,
        }, (res) => {
            if (typeof res === 'string') {
                Message.error(res);
            } else {
                Message.success('创建成功');
                action.setUser(res);
                action.closeLoginDialog();
                window.localStorage.setItem('token', res.token);
            }
        });
    }
    renderLogin() {
        return (
            <div className="pane">
                <h3>用户名</h3>
                <Input ref={i => this.loginUsername = i} onEnter={this.handleLogin} />
                <h3>密码</h3>
                <Input type="password" ref={i => this.loginPassword = i} onEnter={this.handleLogin} />
                <button onClick={this.handleLogin}>登录</button>
            </div>
        );
    }
    renderRegister() {
        return (
            <div className="pane">
                <h3>用户名</h3>
                <Input ref={i => this.registerUsername = i} onEnter={this.handleRegister} />
                <h3>密码</h3>
                <Input type="password" ref={i => this.registerPassword = i} onEnter={this.handleRegister} />
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

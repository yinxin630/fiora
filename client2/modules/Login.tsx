import React, { Component } from 'react';
import platform from 'platform';

import socket from '../socket';
import {
    Tabs, TabPane, TabContent, ScrollableInkTabBar,
} from '../components/Tabs';
import Input from '../components/Input';
import Message from '../components/Message';
import Style from './Login.less';
import action from '../../client/state/action';

class Login extends Component {
    handleLogin = () => {
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

    handleRegister = () => {
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
                <Input ref={(i) => { this.loginUsername = i; }} onEnter={this.handleLogin} />
                <h3>密码</h3>
                <Input type="password" ref={(i) => { this.loginPassword = i; }} onEnter={this.handleLogin} />
                <button onClick={this.handleLogin} type="button">登录</button>
            </div>
        );
    }

    renderRegister() {
        return (
            <div className="pane">
                <h3>用户名</h3>
                <Input ref={(i) => { this.registerUsername = i; }} onEnter={this.handleRegister} placeholder="用户名即昵称, 支持中文, 请慎重填写, 不可修改" />
                <h3>密码</h3>
                <Input type="password" ref={(i) => { this.registerPassword = i; }} onEnter={this.handleRegister} placeholder="暂时也不支持修改密码" />
                <button onClick={this.handleRegister} type="button">注册</button>
            </div>
        );
    }

    render() {
        return (
            <Tabs
                className={Style.login}
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

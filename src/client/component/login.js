import React from 'react';
import '../style/login.scss';

import user from '../action/user';
import ui from '../action/ui';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
            usernameInput: 'normal',
            passwordInput: 'normal'
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
    }

    handleLogin() {
        user
        .login(this.username.value, this.password.value)
        .then(result => {
            if (result.data === 'need username param but not exists') {
                ui.openNotification('请输入用户名');
                this.setState({ usernameInput: 'error' });
            }
            else if (result.data === 'need password param but not exists') {
                ui.openNotification('请输入密码');
                this.setState({ passwordInput: 'error' });
            }
            else if (result.data === 'user not exists') {
                ui.openNotification('该用户不存在!');
            }
            else if (result.data === 'password not correct') {
                ui.openNotification('密码错误!');
                this.setState({ passwordInput: 'error' });
            }
        });
    }

    handleSignup() {
        user
        .signup(this.username.value, this.password.value)
        .then(result => {
            if (result.status === 201) {
                user
                .login(this.username.value, this.password.value);
            }
            else {
                if (result.data === 'need username param but not exists') {
                    ui.openNotification('请输入用户名');
                    this.setState({ usernameInput: 'error' });
                }
                else if (result.data === 'need password param but not exists') {
                    ui.openNotification('请输入密码');
                    this.setState({ passwordInput: 'error' });
                }
                else if (result.data === 'username already exists') {
                    ui.openNotification('注册失败! 用户名已存在.');
                    this.setState({ usernameInput: 'error' });
                }
                else if (result.data === 'username invalid') {
                    ui.openNotification('注册失败! 用户名仅能使用字母,数字,汉字,横线-,下划线_.');
                    this.setState({ usernameInput: 'error' });
                }
                else {
                    ui.openNotification('注册失败! 服务器发生错误, 请联系管理员.');
                }
            }
        });
    }

    render () {
        const { login, usernameInput, passwordInput } = this.state;
        return (
            <div className="login">
                <div>
                    <div className={`${usernameInput}`}>
                        <div>
                            <i className="icon">&#xe608;</i>
                        </div>
                        <input
                            type="text"
                            ref={username => this.username = username}
                            placeholder="用户名"
                            onFocus={() => this.setState({ usernameInput: 'focus' })}
                            onBlur={() => this.setState({ usernameInput: 'normal' })}
                        />
                    </div>
                    <div  className={`${passwordInput}`}>
                        <div>
                            <i className="icon">&#xe60b;</i>
                        </div>
                        <input
                            type="password"
                            ref={password => this.password = password}
                            placeholder="密码"
                            onFocus={() => this.setState({ passwordInput: 'focus' })}
                            onBlur={() => this.setState({ passwordInput: 'normal' })}
                        />
                    </div>
                    {
                        login ?
                        <button
                            onClick={this.handleLogin}
                        >登录</button>
                        :
                        <button
                            onClick={this.handleSignup}
                        >注册</button>
                    }
                    {
                        login ?
                        <span
                            onClick={() => this.setState({ login: false })}
                        >还没有帐号? 那就注册一个吧 (ﾉ ○ Д ○)ﾉ</span>
                        :
                        <span
                            onClick={() => this.setState({ login: true })}
                        >已有帐号, 我是一个老司机 ヾ(=^▽^=)ノ</span>
                    }
                </div>
            </div>
        );
    }
}

export default Login;
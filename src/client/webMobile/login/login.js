import React from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './login.scss';

import user from '../../action/user';

class Login extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            usernameInput: 'normal',
            passwordInput: 'normal',
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
    }

    handleLogin() {
        user
            .login(this.username.value, this.password.value)
            .then(result => {
                if (result.status === 201) {
                    window.localStorage.setItem('token', result.data.token);
                    this.context.router.push('/linkman');
                    user.online();
                }
                else {
                    if (result.data === 'need username param but not exists') {
                        // ui.openNotification('请输入用户名');
                        this.setState({ usernameInput: 'error' });
                    }
                    else if (result.data === 'need password param but not exists') {
                        // ui.openNotification('请输入密码');
                        this.setState({ passwordInput: 'error' });
                    }
                    else if (result.data === 'user not exists') {
                        // ui.openNotification('该用户不存在!');
                    }
                    else if (result.data === 'password not correct') {
                        // ui.openNotification('密码错误!');
                        this.setState({ passwordInput: 'error' });
                    }
                    else if (result.data === 'you have login. please logout first') {
                        // ui.openNotification('您已经登录了一个帐号, 请退出登录后再试!');
                    }
                    else {
                        // ui.openNotification('登录失败! 服务器发生错误, 请联系管理员.');
                    }
                }
            });
    }

    handleSignup() {
        user
            .signup(this.username.value, this.password.value)
            .then(result => {
                if (result.status === 201) {
                    user
                        .login(this.username.value, this.password.value)
                        .then(() => {
                            this.context.router.push('/linkman');
                            user.online();
                        });
                }
                else {
                    if (result.data === 'need username param but not exists') {
                        // ui.openNotification('请输入用户名');
                        this.setState({ usernameInput: 'error' });
                    }
                    else if (result.data === 'need password param but not exists') {
                        // ui.openNotification('请输入密码');
                        this.setState({ passwordInput: 'error' });
                    }
                    else if (result.data === 'username already exists') {
                        // ui.openNotification('注册失败! 用户名已存在.');
                        this.setState({ usernameInput: 'error' });
                    }
                    else if (result.data === 'username invalid') {
                        // ui.openNotification('注册失败! 用户名仅能使用字母,数字,汉字,横线-,下划线_.');
                        this.setState({ usernameInput: 'error' });
                    }
                    else {
                        // ui.openNotification('注册失败! 服务器发生错误, 请联系管理员.');
                    }
                }
            });
    }

    render() {
        const { usernameInput, passwordInput } = this.state;
        return (
            <div className="login">
                <div>
                    <div className={`${usernameInput}`}>
                        <div>
                            <i className="icon">&#xe608; </i>
                        </div>
                        <input
                            type="text"
                            ref={username => this.username = username}
                            placeholder="用户名"
                            onFocus={() => this.setState({ usernameInput: 'focus' })}
                            onBlur={() => this.setState({ usernameInput: 'normal' })}
                        />
                    </div>
                    <div className={`${passwordInput}`}>
                        <div>
                            <i className="icon">&#xe60b; </i>
                        </div>
                        <input
                            type="password"
                            ref={password => this.password = password}
                            placeholder="密码"
                            onFocus={() => this.setState({ passwordInput: 'focus' })}
                            onBlur={() => this.setState({ passwordInput: 'normal' })}
                        />
                    </div>
                    <div>
                        <button
                            onClick={this.handleLogin}
                        >
                            登录 ヾ(=^▽^=) ノ
                        </button>
                        <button
                            onClick={() => this.handleSignup}
                        >
                            注册 (ﾉ ○ Д ○) ﾉ
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;

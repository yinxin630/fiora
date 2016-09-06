import React from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './style/login.scss';

import user from '../../action/user';
import ui from '../../action/ui';

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

                if (result.status === 201) {
                    window.localStorage.setItem('token', result.data.token);
                    this.context.router.push('/chat');
                    user.online();
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
                    <button
                        onClick={this.handleLogin}
                    >
                        登录
                    </button>
                    <span
                        onClick={() => this.context.router.push('/signup')}
                    >
                        还没有帐号?那就注册一个吧 (ﾉ ○ Д ○) ﾉ
                    </span>
                </div>
            </div>
        );
    }
}

export default Login;

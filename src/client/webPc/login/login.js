import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './login.scss';

import user from '../../action/user';
import ui from '../../action/pc';
import Avatar from '../../common/avatar';

class Login extends React.Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string,
    }

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
        this.renderLogin = this.renderLogin.bind(this);
        this.renderSignup = this.renderSignup.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    handleLogin() {
        user
            .login(this.username.value, this.password.value)
            .then(result => {
                if (result.status === 201) {
                    window.localStorage.setItem('token', result.data.token);
                    this.context.router.push('/main');
                    user.online();
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
                    else if (result.data === 'user not exists') {
                        ui.openNotification('该用户不存在!');
                    }
                    else if (result.data === 'password not correct') {
                        ui.openNotification('密码错误!');
                        this.setState({ passwordInput: 'error' });
                    }
                    else if (result.data === 'you have login. please logout first') {
                        ui.openNotification('您已经登录了一个帐号, 请退出登录后再试!');
                    }
                    else {
                        ui.openNotification('登录失败! 服务器发生错误, 请联系管理员.');
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
                            this.context.router.push('/main');
                            user.online();
                        });
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

    handleUsernameChange() {
        ui.getUserAvatar(this.username.value);
    }

    renderLogin() {
        const { usernameInput, passwordInput } = this.state;
        const { username, avatar } = this.props;
        return (
            <div className="login">
                <div>
                    <div>
                        <Avatar
                            name={username}
                            avatar={avatar !== '' ? avatar : 'http://assets.suisuijiang.com/user_avatar_default.png'}
                            width={100}
                            height={100}
                        />
                    </div>
                    <div>
                        <span>欢迎老司机归来 ヾ(=^▽^=) ノ</span>
                        <div className={`input ${usernameInput}`}>
                            <div>
                                <i className="icon">&#xe608; </i>
                            </div>
                            <input
                                type="text"
                                ref={name => this.username = name}
                                placeholder="用户名"
                                onFocus={() => this.setState({ usernameInput: 'focus' })}
                                onBlur={() => this.setState({ usernameInput: 'normal' })}
                                onChange={this.handleUsernameChange}
                            />
                        </div>
                        <div className={`input ${passwordInput}`}>
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
                            <span
                                onClick={() => this.context.router.push('/signup')}
                            >
                                注册
                            </span>
                            <button
                                onClick={this.handleLogin}
                            >
                                登录
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderSignup() {
        const { usernameInput, passwordInput } = this.state;
        return (
            <div className="login">
                <div>
                    <div>
                        <Avatar
                            name="a"
                            avatar={'http://assets.suisuijiang.com/user_avatar_default.png'}
                            width={100}
                            height={100}
                        />
                    </div>
                    <div>
                        <span
                            style={{ position: 'relative', top: -4 }}
                        >新司机快注册驾照 (ﾉ ○ Д ○) ﾉ</span>
                        <div className={`input ${usernameInput}`}>
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
                        <div className={`input ${passwordInput}`}>
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
                            <span
                                onClick={() => this.context.router.push('/login')}
                            >
                                登录
                            </span>
                            <button
                                onClick={this.handleSignup}
                            >
                                注册
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return /^(\/|\/login)$/.test(this.props.location.pathname) ? this.renderLogin() : this.renderSignup();
    }
}

export default connect(
    state => ({
        username: state.getIn(['pc', 'username']),
        avatar: state.getIn(['pc', 'avatar']),
    })
)(Login);

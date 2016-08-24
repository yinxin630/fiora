import React from 'react';
import './style/signup.scss';

import user from '../../action/user';
import ui from '../../action/ui';

class Login extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            usernameInput: 'normal',
            passwordInput: 'normal'
        };

        this.handleSignup = this.handleSignup.bind(this);
    }

    handleSignup() {
        user
            .signup(this.username.value, this.password.value)
            .then(result => {
                if (result.status === 201) {
                    user
                        .login(this.username.value, this.password.value)
                        .then(result => {
                            this.context.router.push('/chat');
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

    render() {
        const { usernameInput, passwordInput } = this.state;
        return (
            <div className="signup">
                <div>
                    <div className={`${usernameInput}`}>
                        <div>
                            <i className="icon">&#xe608; </i>
                        </div>
                        <input
                            type="text"
                            ref={username => this.username = username}
                            placeholder="用户名"
                            onFocus={() => this.setState({ usernameInput: 'focus' }) }
                            onBlur={() => this.setState({ usernameInput: 'normal' }) }
                            />
                    </div>
                    <div  className={`${passwordInput}`}>
                        <div>
                            <i className="icon">&#xe60b; </i>
                        </div>
                        <input
                            type="password"
                            ref={password => this.password = password}
                            placeholder="密码"
                            onFocus={() => this.setState({ passwordInput: 'focus' }) }
                            onBlur={() => this.setState({ passwordInput: 'normal' }) }
                            />
                    </div>
                    <button
                        onClick={this.handleSignup}
                        >
                        注册
                    </button>
                    <span
                        onClick={() => this.context.router.push('/login') }
                        >
                        已有帐号, 我是一个老司机 ヾ(=^▽^=) ノ
                    </span>
                </div>
            </div>
        );
    }
}

export default Login;
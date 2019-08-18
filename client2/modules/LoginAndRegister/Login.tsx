import React, { useState } from 'react';
import platform from 'platform';

import Input from '../../components/Input';
import socket from '../../socket';
import Message from '../../components/Message';
import useAction from '../../hooks/useAction';

import Style from './LoginRegister.less';

/** 登录框 */
function Login() {
    const action = useAction();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        socket.emit(
            'login',
            {
                username,
                password,
                os: platform.os.family,
                browser: platform.name,
                environment: platform.description,
            },
            (res) => {
                if (typeof res === 'string') {
                    Message.error(res);
                } else {
                    action.setUser(res);
                    action.toggleLoginRegisterDialog(false);
                    window.localStorage.setItem('token', res.token);
                }
            },
        );
    }

    return (
        <div className={Style.loginRegister}>
            <h3 className={Style.title}>用户名</h3>
            <Input
                className={Style.input}
                value={username}
                onChange={setUsername}
                onEnter={handleLogin}
            />
            <h3 className={Style.title}>密码</h3>
            <Input
                className={Style.input}
                type="password"
                value={password}
                onChange={setPassword}
                onEnter={handleLogin}
            />
            <button className={Style.button} onClick={handleLogin} type="button">
                登录
            </button>
        </div>
    );
}

export default Login;

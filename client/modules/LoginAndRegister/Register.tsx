import React, { useState } from 'react';
import platform from 'platform';
import { useDispatch } from 'react-redux';

import Style from './LoginRegister.less';
import Input from '../../components/Input';
import useAction from '../../hooks/useAction';
import { getLinkmansLastMessages, register } from '../../service';
import getFriendId from '../../../utils/getFriendId';
import { Message } from '../../state/reducer';
import convertMessage from '../../../utils/convertMessage';
import { ActionTypes } from '../../state/action';

/** 登录框 */
function Register() {
    const action = useAction();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleRegister() {
        const user = await register(
            username,
            password,
            platform.os.family,
            platform.name,
            platform.description,
        );
        if (user) {
            action.setUser(user);
            action.toggleLoginRegisterDialog(false);
            window.localStorage.setItem('token', user.token);

            const linkmanIds = [
                ...user.groups.map((group) => group._id),
                ...user.friends.map((friend) => getFriendId(friend.from, friend.to._id)),
            ];
            const linkmanMessages = await getLinkmansLastMessages(linkmanIds);
            Object.values(linkmanMessages).forEach(
                (messages: Message[]) => messages.forEach(convertMessage),
            );
            dispatch({
                type: ActionTypes.SetLinkmansLastMessages,
                payload: linkmanMessages,
            });
        }
    }

    return (
        <div className={Style.loginRegister}>
            <h3 className={Style.title}>用户名</h3>
            <Input
                className={Style.input}
                value={username}
                onChange={setUsername}
                onEnter={handleRegister}
            />
            <h3 className={Style.title}>密码</h3>
            <Input
                className={Style.input}
                type="password"
                value={password}
                onChange={setPassword}
                onEnter={handleRegister}
            />
            <button className={Style.button} onClick={handleRegister} type="button">
                注册
            </button>
        </div>
    );
}

export default Register;

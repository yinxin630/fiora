import React from 'react';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';

import fetch from '../../utils/fetch';
import platform from '../../utils/platform';
import action from '../../state/action';

import Base from './Base';
import { setStorageValue } from '../../utils/storage';
import { Friend, Group } from '../../types/redux';

export default function Login() {
    async function handleSubmit(username: string, password: string) {
        const [err, res] = await fetch(
            'login',
            {
                username,
                password,
                ...platform,
            },
        );
        if (!err) {
            const user = res;
            action.setUser(user);

            const linkmanIds = [
                ...user.groups.map((g: Group) => g._id),
                ...user.friends.map((f: Friend) => f._id),
            ];
            const [err2, linkmans] = await fetch('getLinkmansLastMessagesV2', {
                linkmans: linkmanIds,
            });
            if (!err2) {
                action.setLinkmansLastMessages(linkmans);
            }

            Actions.pop();
            await setStorageValue('token', res.token);
        }
    }
    return (
        <Container>
            <Base
                buttonText="登录"
                jumpText="注册新用户"
                jumpPage="signup"
                onSubmit={handleSubmit}
            />
        </Container>
    );
}

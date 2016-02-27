'use strict'

const React = require('react');
import Header from '../components/header.jsx';
import { Form, fieldset, Input } from 'amazeui-react';

export default class Login extends React.Component {
    render () {
        return (
            <div style={{
                flex: 1,
            }}>
                <div style={{
                    width: 300,
                    margin: '100px auto',
                }}>
                    <Form>
                        <fieldset className="am-form-set">
                            <Input placeholder="用户名" icon="user"/>
                            <Input type="password" icon="lock" placeholder="密码"/>
                        </fieldset>
                        <Input type="submit" value="登录" amStyle="primary" block />
                    </Form>
                </div>
            </div>
        )
    }
}
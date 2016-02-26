'use strict'

const React = require('react');
import Header from './header.jsx';
import { Form, fieldset, Input } from 'amazeui-react';

export default class Register extends React.Component {
    render () {
        return (
            <div style={{
                height: window.innerHeight,
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Header/>
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
                                <Input type="password" icon="lock" placeholder="重复密码"/>
                            </fieldset>
                            <Input type="submit" value="提交" amStyle="primary" block />
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
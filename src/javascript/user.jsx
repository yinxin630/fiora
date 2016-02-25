'use strict'

const React = require('react');
import { Image } from 'amazeui-react';

export default class User extends React.Component {
    render () {
        return (
            <div style={{
                textAlign: 'center',
            }}>
                <div style={{
                    padding: '10px 0px 5px 0px',
                }}>
                    <Image src={ this.props.avatar }
                        width={80} height={80} circle
                    />
                </div>
                <span>{ this.props.nickname }</span>
            </div>
        );
    }
}
'use strict'

const React = require('react');
import { Image } from 'amazeui-react';

export default class Topbar extends React.Component {
    static defaultProps = {
        avatar: '',
        nickname: '',
        noNickname: false,
    }
    
    render () {
        return (
            <div style={{
                height: '60px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #e0e0e0',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <div style={{
                        padding: 10,
                        display: this.props.noNickname ? 'none' : 'block'
                    }}>
                        <Image src={ this.props.avatar }
                            width={40} height={40} circle
                        />
                    </div>
                    <span>{ this.props.nickname }</span>
                </div>
                <div>
                    <div style={{
                    }} className="am-icon-md am-icon-gear"/>
                </div>
            </div>
        );
    }
}
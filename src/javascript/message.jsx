'use strict'

const React = require('react');
import { Image } from 'amazeui-react';

export default class Message extends React.Component {
    static defaultProps = {
        avatar: 'http://chat.suisuijiang.com/images/head.png',
        nickname: '默认昵称',
        time: '12:12:12',
        content: '默认消息内容',
        align: 'left',
    }
    
    render () {
        return (
            <div style={{
                margin: '0px 15px',
                display: 'flex',
                marginTop: 10,
                flexDirection: this.props.align !== 'right' || 'row-reverse', 
            }}>
                    <Image src={ this.props.avatar }
                    width={40} height={40} circle
                />
                <div style={{
                    width: 'calc(100% - 60px * 2)',
                    maxWidth: '500px',
                }}>
                    <div style={{
                        textAlign: this.props.align,
                    }}>
                        { this.props.nickname } {this.props.time}
                    </div>
                    <div
                    style={{
                        textAlign: this.props.align,
                    }}>
                        { this.props.content }
                    </div>
                </div>
            </div>
        );
    }
}
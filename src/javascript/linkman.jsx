'use strict'

const React = require('react');
import { Image } from 'amazeui-react';

export default class Linkman extends React.Component {
    static defaultProps = {
        avatar: 'http://chat.suisuijiang.com/images/head.png',
        nickname: '默认昵称',
        time: '12:12:12',
        content: '默认内容',
        focus: false,
    };
    
    render () {
        return (
            <div style={{
                display: 'flex',
                borderBottom: '1px solid #e0e0e0',
                backgroundColor: this.props.focus ? '#D8D8EB' : '',
            }} className="linkman">
                <div style={{
                    padding: '10px',
                }}>
                    <Image src={ this.props.avatar }
                        width={40} height={40} circle
                    />
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flex: 1,
                    padding: '10px 10px 10px 0px',
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        alignItems: 'center',
                    }}>
                        <div style={{
                            fontSize: '1.4rem',
                        }}>{ this.props.nickname }</div>
                        <div style={{
                            fontSize: '0.6rem',
                            color: '#687275',
                        }}>{ this.props.time }</div>
                    </div>
                    <div style={{
                        color: '#687275',
                        fontSize: '1rem',
                    }}>
                        { this.props.content }
                    </div>
                </div>
            </div>
        );
    }
}
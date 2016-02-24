'use strict'

const React = require('react');
import { Image } from 'amazeui-react';
import Linkman from './linkman.jsx';
import LinkmanForm from './linkmanForm.jsx';

export default class Body extends React.Component {
    render () {
        return (
            <div style={{
                flex: 1,
                display: 'flex',
            }}>
                <div style={{
                    backgroundColor: 'aquamarine',
                    width: '100px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <div style={{
                        textAlign: 'center',
                    }}>
                        <div style={{
                            padding: '10px 0px 5px 0px',
                        }}>
                            <Image src="http://chat.suisuijiang.com/images/head.png"
                                width={80} height={80} circle
                            />
                        </div>
                        <span>昵称</span>
                    </div>
                    <nav style={{
                        flex: 1,
                        marginTop: '100px',
                    }}>
                        <a>消息</a>
                    </nav>
                </div>
                <LinkmanForm>
                    <Linkman/>
                    <Linkman/>
                    <Linkman/>
                </LinkmanForm>
                <div style={{
                    backgroundColor: 'teal',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <div style={{
                        height: '60px',
                        backgroundColor: 'pink',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <div>
                            巴拉拉小魔仙
                        </div>
                        <div>
                            <div style={{
                            }} className="am-icon-md am-icon-gear"/>
                        </div>
                    </div>
                    <div style={{
                        flex: 1,
                        backgroundColor: 'purple',
                    }}>
                        <div style={{
                            backgroundColor: 'red',
                            margin: '0px 15px',
                            display: 'flex',
                            marginTop: 10,
                        }}>
                             <Image src="http://chat.suisuijiang.com/images/head.png"
                                width={40} height={40} circle
                            />
                            <div style={{
                                backgroundColor: 'green',
                                width: 'calc(100% - 60px * 2)',
                                maxWidth: '500px',
                            }}>
                                <div style={{
                                    textAlign: 'left',
                                }}>
                                    巴拉拉小魔仙 12:13:14
                                </div>
                                <div
                                style={{
                                    textAlign: 'left',
                                }}>
                                    你好~
                                </div>
                            </div>
                        </div>
                        <div style={{
                            backgroundColor: 'red',
                            margin: '0px 15px',
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            marginTop: 10,
                        }}>
                             <Image src="http://chat.suisuijiang.com/images/head.png"
                                width={40} height={40} circle
                            />
                            <div style={{
                                backgroundColor: 'green',
                                width: 'calc(100% - 40px * 2)',
                                maxWidth: '500px',
                            }}>
                                <div style={{
                                    textAlign: 'right',
                                }}>
                                    巴拉拉小魔仙 12:13:14
                                </div>
                                <div style={{
                                    textAlign: 'right',
                                }}>
                                    你好~
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        height: '6rem',
                        backgroundColor: 'thistle',
                    }}>
                        输入区
                    </div>
                </div>
            </div>
        )
    }
}
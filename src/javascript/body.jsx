'use strict'

const React = require('react');
import { Image } from 'amazeui-react';

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
                        <button>消息</button>
                    </nav>
                </div>
                <div style={{
                    width: '220px',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <div style={{
                        display: 'flex',
                    }}>
                        <div style={{
                            padding: '10px',
                        }}>
                            <Image src="http://chat.suisuijiang.com/images/head.png"
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
                                }}>它的昵称</div>
                                <div style={{
                                    fontSize: '0.7rem',
                                    color: '#687275',
                                }}>11:12:13</div>
                            </div>
                            <div style={{
                                color: '#687275',
                                fontSize: '1rem',
                            }}>
                                消息内容...
                            </div>
                        </div>
                    </div>
                    <div style={{
                        height: '60px',
                        backgroundColor: 'green',
                    }}>联系人1</div>
                    <div style={{
                        height: '60px',
                        backgroundColor: 'blue',
                    }}>联系人2</div>
                </div>
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
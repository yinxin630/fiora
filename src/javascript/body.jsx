'use strict'

const React = require('react');

export default class Body extends React.Component {
    render () {
        return (
            <div style={{
                flex: 1,
                display: 'flex',
            }}>
                <div style={{
                    backgroundColor: 'aquamarine',
                    width: '10rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <div style={{
                        width: '8rem',
                        height: '8rem',
                        backgroundColor: 'red',
                    }}>
                        头像
                    </div>
                    <span>昵称</span>
                    <button>聊天</button>
                    <button>论坛</button>
                </div>
                <div style={{
                    backgroundColor: 'cadetblue',
                    width: '20rem',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <div style={{
                        height: '6rem',
                        backgroundColor: 'green',
                    }}>联系人1</div>
                    <div style={{
                        height: '6rem',
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
                        height: '4rem',
                        backgroundColor: 'pink',
                    }}>
                        头部
                    </div>
                    <div style={{
                        flex: 1,
                        backgroundColor: 'purple',
                    }}>
                        主框体
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
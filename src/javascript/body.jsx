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
                }}>
                    侧栏
                </div>
                <div style={{
                    backgroundColor: 'cadetblue',
                    width: '20rem',
                }}>
                    联系人
                </div>
                <div style={{
                    backgroundColor: 'teal',
                    flex: 1,
                }}>
                    聊天框
                </div>
            </div>
        )
    }
}
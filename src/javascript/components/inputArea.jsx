'use strict'

const React = require('react');

export default class InputArea extends React.Component {
    render () {
        return (
            <div style={{
                height: 80,
                display: 'flex',
            }}>
                <textarea style={{
                    flex: 1,
                    padding: '5px 10px',
                    fontSize: '1.4rem',
                    color: '#5B5B5B',
                }}/>
                <button style={{
                    width: 50,
                    height: 80,
                    backgroundColor: 'inherit',
                    color: '#8E8E8E',
                    ":hover": {
                        backgroundColor: 'red',
                    }
                }}>
                    发送
                </button>
            </div>
        );
    }
}
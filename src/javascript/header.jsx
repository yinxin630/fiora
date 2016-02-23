'use strict'

const React = require('react');

export default class Header extends React.Component {
    render () {
        const aStyle = {
            marginLeft: '1rem',
        };
        return (
            <div style={{
                borderBottom: '0.1rem solid #8b8b8b',
            }}>
                <div style={{
                    width: '70%',
                    margin: 'auto',
                    padding: '0rem 2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <h1 style={{
                        fontSize: '4rem',
                        padding: '1rem 0rem',
                    }}>FIORA</h1>
                    <nav style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <a style={ aStyle }>注册</a>
                        <a style={ aStyle }>登录</a>
                    </nav>
                </div>
            </div>
        )
    }
}
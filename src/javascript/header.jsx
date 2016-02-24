'use strict'

const React = require('react');

export default class Header extends React.Component {
    render () {
        const aStyle = {
            marginLeft: '10px',
        };
        return (
            <div style={{
                borderBottom: '1px solid #8b8b8b',
                boxShadow: '0px 0px 5px',
            }}>
                <div style={{
                    width: '70%',
                    margin: 'auto',
                    padding: '0px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <h1 style={{
                        fontSize: '3rem',
                        padding: '6px 0px',
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
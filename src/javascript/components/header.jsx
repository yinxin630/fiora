'use strict'

const React = require('react');
import { Link } from 'react-router';

const BackgroundColor = '#272727';
const AppNameColor = '#FFFFFF';
const LinkColor = '#FFFFFF';
const aStyle = {
    marginLeft: '10px',
    color: LinkColor,
};
const partitionStyle = {
    marginLeft: 40,
}

export default class Header extends React.Component {
    render () {
        return (
            <div style={{
                backgroundColor: BackgroundColor,
                boxShadow: `0px 0px 10px ${BackgroundColor}`,
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
                        color: AppNameColor,
                    }}>FIORA</h1>
                    <nav style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <a style={ aStyle }>
                            <Link to="/">首页</Link>
                        </a>
                        <div style={ partitionStyle }/>
                        <a style={ aStyle }>
                            <Link to="/register">注册</Link>
                        </a>
                        <a style={ aStyle }>
                            <Link to="/login">登录</Link>
                        </a>
                    </nav>
                </div>
            </div>
        )
    }
}
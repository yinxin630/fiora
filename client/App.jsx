import React, { Component } from 'react';
import 'normalize.css';
import { hot } from 'react-hot-loader';

import Main from './modules/main/Main';

import './App.less';

// App can't be stateless component
class App extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            width: 0.7,
            height: 0.85,
            resize: 0,
            primaryColor: '74, 144, 226',
            primaryTextColor: '247, 247, 247',
        };
    }
    componentDidMount() {
        this.setCssVariable();
        window.onresize = () => {
            // 触发rerender
            this.setState({
                resize: this.state.resize + 1,
            });
        };
    }
    static get style() {
        return {
            backgroundSize: '1920px 1080px',
        };
    }
    get blurStyle() {
        const { width, height } = this.state;
        const { innerWidth, innerHeight } = window;
        return Object.assign(
            {
                backgroundSize: '1920px 1080px',
                backgroundPosition: `${-(1 - width) * innerWidth / 2}px ${-(1 - height) * innerHeight / 2}px`,
            },
            this.childStyle,
        );
    }
    get childStyle() {
        const { width, height } = this.state;
        return {
            width: `${width * 100}%`,
            height: `${height * 100}%`,
            position: 'absolute',
            left: `${(1 - width) / 2 * 100}%`,
            top: `${(1 - height) / 2 * 100}%`,
        };
    }
    setCssVariable() {
        let cssText = '';
        for (let i = 0; i <= 10; i++) {
            cssText += `--primary-color-${i}:rgba(${this.state.primaryColor}, ${i / 10});--primary-color-${i}_5:rgba(${this.state.primaryColor}, ${(i + 0.5) / 10});--primary-text-color-${i}:rgba(${this.state.primaryTextColor}, ${i / 10});`;
        }
        document.documentElement.style.cssText += cssText;
    }
    render() {
        return (
            <div className="app" style={App.style}>
                <div className="blur" style={this.blurStyle} />
                <div className="child" style={this.childStyle}>
                    <Main />
                </div>
            </div>
        );
    }
}

export default hot(module)(App);

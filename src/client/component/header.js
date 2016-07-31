import React from 'react';
import '../style/header.scss';

class Header extends React.Component {
    render () {
        return (
            <header>
                <div className="logo">
                    <img src={ require('../image/logo.png') }/>
                </div>
                <nav className="nav">
                    <div className="selected">
                        <i className="icon">&#xe601;</i>
                    </div>
                    <div>
                        <i className="icon">&#xe600;</i>
                    </div>
                    <div>
                        <i className="icon">&#xe603;</i>
                    </div>
                </nav>
                <div className="user">
                    <div></div>
                    <img src={ require('../image/avatar.gif') }/>
                </div>
            </header>
        );
    }
}

export default Header;
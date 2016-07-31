import React from 'react';
import '../style/header.scss';

class Header extends React.Component {
    render () {
        return (
            <header>
                <div>
                    <img src={ require('../image/logo.png') }/>
                </div>
            </header>
        );
    }
}

export default Header;
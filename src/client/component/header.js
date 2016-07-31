import React from 'react';
import '../style/header.scss';

import Logo from './logo';
import NavList from './navList';

class Header extends React.Component {
    render () {
        return (
            <header>
                <Logo/>
                <NavList.container>
                    <NavList.item icon="&#xe601;"/>
                    <NavList.item icon="&#xe600;"/>
                    <NavList.item icon="&#xe603;"/>
                </NavList.container>
                <div className="user">
                    <div></div>
                    <img src={ require('../image/avatar.gif') }/>
                </div>
            </header>
        );
    }
}

export default Header;
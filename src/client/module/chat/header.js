import React from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './style/header.scss';

import Logo from './logo';
import NavList from './navList';
import UserPanel from './userPanel';
import ui from '../../action/ui';
import mask from '../../util/mask';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.handleSettingClick = this.handleSettingClick.bind(this);
    }

    handleSettingClick() {
        ui.openSystemSetting();
        mask(ui.closeSystemSetting);
    }

    render() {
        return (
            <header>
                <Logo />
                <NavList.container>
                    <NavList.item
                        icon="&#xe607;"
                        selected
                    />
                    <NavList.item
                        icon="&#xe600;"
                    />
                    <NavList.item
                        icon="&#xe606;"
                        onClick={this.handleSettingClick}
                    />
                </NavList.container>
                <UserPanel />
            </header>
        );
    }
}

export default Header;

import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './style/header.scss';

import Logo from './logo';
import NavList from './navList';
import UserPanel from './userPanel';
import ui from '../../action/ui';
import mask from '../../util/mask';

class Header extends React.Component {
    static propTypes = {
        location: PropTypes.object,
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

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
                        onClick={() => this.context.router.push('/chat/body')}
                        selected
                    />
                    <NavList.item
                        icon="&#xe600;"
                        onClick={() => this.context.router.push('/chat/manage')}
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

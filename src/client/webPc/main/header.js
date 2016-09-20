import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './header.scss';

import Logo from './logo';
import NavList from './navList';
import UserPanel from './userPanel';
import ui from '../../action/ui';
import mask from '../../util/mask';

class Header extends React.Component {
    static propTypes = {
        pathname: PropTypes.string,
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
        const { pathname } = this.props;

        return (
            <header>
                <Logo />
                <NavList.container>
                    <NavList.item
                        icon="&#xe607;"
                        onClick={() => this.context.router.push('/main/chat')}
                        selected={/^\/chat\/body|\/chat$/.test(pathname)}
                    />
                    <NavList.item
                        icon="&#xe600;"
                        onClick={() => this.context.router.push('/main/manage')}
                        selected={/^\/chat\/manage$/.test(pathname)}
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

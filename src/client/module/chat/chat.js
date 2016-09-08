import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './style/chat.scss';

import Header from './header';
import SystemSetting from './systemSetting';
import UserSetting from './userSetting';
import MaskLayout from './maskLayout';

class Chat extends React.Component {
    static propTypes = {
        children: PropTypes.element,
        user: PropTypes.object,
        location: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const { user, location } = this.props;
        if (!user.get('_id')) {
            // if store don't hava user data. render empty div
            return <div />;
        }

        return (
            <div className="app">
                <Header
                    pathname={location.pathname}
                />
                { this.props.children }
                <SystemSetting />
                <UserSetting />
                <MaskLayout />
            </div>
        );
    }
}

export default connect(
    state => ({
        user: state.get('user'),
    })
)(Chat);

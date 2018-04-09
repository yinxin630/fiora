import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Avatar from '@/components/Avatar';
import IconButton from '@/components/IconButton';

import SingleCheckGroup from './SingleCheckGroup';
import SingleCheckButton from './SingleCheckButton';
import OnlineStatus from './OnlineStatus';
import './Sidebar.less';

class Sidebar extends Component {
    static propTypes = {
        isLogin: PropTypes.bool.isRequired,
        isConnect: PropTypes.bool.isRequired,
        avatar: PropTypes.string,
    }
    render() {
        const { isLogin, isConnect, avatar } = this.props;
        if (isLogin) {
            return (
                <div className="module-main-sidebar">
                    <Avatar className="avatar" src={avatar} />
                    <OnlineStatus className="status" status={isConnect ? 'online' : 'offline'} />
                    <SingleCheckGroup className="tabs" defaultFocus="chat">
                        <SingleCheckButton key="chat" icon="chat" />
                        <SingleCheckButton key="friends" icon="friends" />
                        <SingleCheckButton key="groups" icon="groups" />
                    </SingleCheckGroup>
                    <div className="buttons">
                        <IconButton width={40} height={40} icon="setting" iconSize={26} />
                        <IconButton width={40} height={40} icon="logout" iconSize={26} />
                    </div>
                </div>
            );
        }
        return (
            <div className="module-main-sidebar" />
        );
    }
}

export default connect(state => ({
    isLogin: !!state.get('user'),
    isConnect: state.get('connect'),
    avatar: state.getIn(['user', 'avatar']),
}))(Sidebar);

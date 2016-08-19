import React from 'react';
import '../style/userPanel.scss';

import { connect } from 'react-redux';

import Avatar from './avatar'

class UserPanel extends React.Component {
    render () {
        const { avatar, username } = this.props;
        return (
            <div className="user-panel">
                <div></div>
                <Avatar
                    avatar={avatar}
                    name={username}
                    width={60}
                    height={60}
                />
            </div>
        );
    }
}

export default connect(
    state => ({
        avatar: state.user.avatar,
        username: state.user.username
    })
)(UserPanel);
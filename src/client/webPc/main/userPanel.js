import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './userPanel.scss';

import Avatar from '../../common/avatar';
import ui from '../../action/ui';
import mask from '../../util/mask';

class UserPanel extends React.Component {
    static propTypes = {
        avatar: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        online: PropTypes.bool,
        user: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.handleAvatarClick = this.handleAvatarClick.bind(this);
    }

    handleAvatarClick() {
        ui.openUserSetting(this.props.user);
        mask(ui.closeUserSetting);
    }

    render() {
        const { avatar, username, online } = this.props;

        return (
            <div className="user-panel">
                <div
                    className={online ? 'online' : 'offline'}
                    title={online ? '在线' : '离线'}
                />
                <Avatar
                    avatar={avatar}
                    name={username}
                    width={60}
                    height={60}
                    onClick={this.handleAvatarClick}
                />
            </div>
        );
    }
}

export default connect(
    state => ({
        avatar: state.getIn(['user', 'avatar']),
        username: state.getIn(['user', 'username']),
        online: state.getIn(['user', 'online']),
        user: state.get('user'),
    })
)(UserPanel);

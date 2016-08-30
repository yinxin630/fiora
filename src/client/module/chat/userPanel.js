import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './style/userPanel.scss';

import Avatar from './avatar';

class UserPanel extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const { avatar, username } = this.props;

        return (
            <div className="user-panel">
                <div />
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

UserPanel.propTypes = {
    avatar: PropTypes.string,
    username: PropTypes.string,
};

export default connect(
    state => ({
        avatar: state.getIn(['user', 'avatar']),
        username: state.getIn(['user', 'username']),
    })
)(UserPanel);

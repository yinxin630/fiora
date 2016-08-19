import React from 'react';
import '../style/userPanel.scss';

import { connect } from 'react-redux';

class UserPanel extends React.Component {
    render () {
        const { avatar, username } = this.props;
        return (
            <div className="user-panel">
                <div></div>
                {
                    avatar.match(/http/) ?
                    <img src={ avatar }/>
                    :
                    <div style={{ backgroundColor: avatar }}>
                        <span>{ username.slice(0, 1) }</span>
                    </div>
                }
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
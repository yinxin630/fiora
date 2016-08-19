import React from 'react';
import '../style/userPanel.scss';

import { connect } from 'react-redux';

class UserPanel extends React.Component {
    render () {
        const { avatar, username } = this.props;
        console.log(avatar, username, this.props.state);
        return (
            <div className="user-panel">
                <div></div>
                {
                    avatar === '' ?
                    <div>
                        <span>{ username.slice(0, 1) }</span>
                    </div>
                    :
                    <img src={ avatar }/>
                }
            </div>
        );
    }
}

export default connect(
    state => ({
        avatar: state.user.avatar,
        username: state.user.username,
        state: state
    })
)(UserPanel);
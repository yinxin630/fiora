import React from 'react';
import '../style/userPanel.scss';

class UserPanel extends React.Component {
    render () {
        return (
            <div className="user-panel">
                <div></div>
                <img src={ require('../image/avatar.gif') }/>
            </div>
        );
    }
}

export default UserPanel;
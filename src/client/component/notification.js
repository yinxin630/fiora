import React from 'react';
import '../style/notification.scss';

import { connect } from 'react-redux';

class Notification extends React.Component {
    renderNotification() {
        const { content } = this.props;
        return (
            <div className="notification">
                <div>
                    { content }
                </div>
            </div>
        );
    }

    render () {
        const { show } = this.props;
        return show ? this.renderNotification.call(this) : null;
    }
}

export default connect(
    state => ({
        show: state.ui.showNotification,
        content: state.ui.notificationContent
    })
)(Notification);
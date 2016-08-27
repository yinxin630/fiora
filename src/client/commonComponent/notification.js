import React from 'react';
import './style/notification.scss';

import pureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    renderNotification() {
        const { content } = this.props;
        console.log(content);
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
        show: state.getIn(['ui', 'showNotification']),
        content: state.getIn(['ui', 'notificationContent'])
    })
)(Notification);
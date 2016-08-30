import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import './style/notification.scss';


class Notification extends React.Component {
    static propTypes = {
        content: PropTypes.string.isRequired,
        show: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

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

    render() {
        const { show } = this.props;
        return show ? this.renderNotification.call(this) : null;
    }
}

export default connect(
    state => ({
        show: state.getIn(['ui', 'showNotification']),
        content: state.getIn(['ui', 'notificationContent']),
    })
)(Notification);

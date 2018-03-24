import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OnlineStatus extends Component {
    static propTypes = {
        status: PropTypes.oneOf([
            'online',
            'offline',
        ]),
    }
    render() {
        const { status } = this.props;
        return (
            <div className="module-main-sidebar-onlineStatus">
                <div className={status} />
            </div>
        );
    }
}

export default OnlineStatus;

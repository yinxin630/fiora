import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OnlineStatus extends Component {
    static propTypes = {
        status: PropTypes.oneOf([
            'online',
            'offline',
        ]),
        className: PropTypes.string,
    }
    render() {
        const { status, className } = this.props;
        return (
            <div className={`module-main-sidebar-onlineStatus ${className}`}>
                <div className={status} />
            </div>
        );
    }
}

export default OnlineStatus;

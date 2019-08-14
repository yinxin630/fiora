import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';

@immutableRenderDecorator
class OnlineStatus extends Component {
    static propTypes = {
        status: PropTypes.oneOf([
            'online',
            'offline',
        ]).isRequired,
        className: PropTypes.string.isRequired,
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

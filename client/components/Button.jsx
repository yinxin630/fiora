import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Button.less';

class Button extends Component {
    static propTypes = {
        onClick: PropTypes.func,
        children: PropTypes.string,
    }
    render() {
        const { onClick, children } = this.props;
        return (
            <button
                className="component-button"
                onClick={onClick}
            >
                {children}
            </button>
        );
    }
}

export default Button;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Button.less';

class Button extends Component {
    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        onClick: PropTypes.func,
        children: PropTypes.string,
    }
    static defaultProps = {
        width: 'initial',
        height: 'initial',
    }
    render() {
        const { width, height, onClick, children } = this.props;
        return (
            <button
                className="component-button"
                style={{ width, height }}
                onClick={onClick}
            >
                {children}
            </button>
        );
    }
}

export default Button;

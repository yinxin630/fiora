import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './components.less';

class Button extends Component {
    static propTypes = {
        onClick: PropTypes.func,
        children: PropTypes.string,
        type: PropTypes.string,
    }
    static defaultProps = {
        type: 'primary',
    }
    render() {
        const { onClick, children, type } = this.props;
        return (
            <button
                className={`component-button ${type}`}
                onClick={onClick}
            >
                {children}
            </button>
        );
    }
}

export default Button;

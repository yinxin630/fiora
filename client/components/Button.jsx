import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
    static propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        onClick: PropTypes.func,
    }
    render() {
        const { width, height, onClick } = this.props;
        return (
            <div
                style={{ width, height }}
                onClick={onClick}
            >
                Button
            </div>
        );
    }
}

export default Button;

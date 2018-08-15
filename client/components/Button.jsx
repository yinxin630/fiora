import React from 'react';
import PropTypes from 'prop-types';

import './components.less';

const Button = ({ children, type, ...props }) => (
    <button
        className={`component-button ${type}`}
        {...props}
    >
        {children}
    </button>
);
Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.string,
    type: PropTypes.string,
};
Button.defaultProps = {
    type: 'primary',
};

export default Button;

import React from 'react';
import PropTypes from 'prop-types';

import './components.less';

const Button = ({ children, type, ...props }) => (
    <button
        className={`component-button ${type}`}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        type="button"
    >
        {children}
    </button>
);
Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.string.isRequired,
    type: PropTypes.string,
};
Button.defaultProps = {
    type: 'primary',
};

export default Button;

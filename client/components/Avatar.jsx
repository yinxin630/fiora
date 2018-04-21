import React from 'react';
import PropTypes from 'prop-types';

import './components.less';

function noop() { }

const Avatar = ({ src, size = 60, onClick = noop, className = '' }) => (
    <img
        className={`component-avatar ${className}`}
        src={src}
        style={{ width: size, height: size, borderRadius: size / 2 }}
        onClick={onClick}
    />
);
Avatar.propTypes = {
    src: PropTypes.string.isRequired,
    size: PropTypes.number,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default Avatar;

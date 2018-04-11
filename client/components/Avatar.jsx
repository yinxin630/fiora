import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ src, size = 60, className = '' }) => (
    <img
        className={`component-avatar ${className}`}
        src={src}
        style={{ width: size, height: size, borderRadius: size / 2 }}
    />
);
Avatar.propTypes = {
    src: PropTypes.string.isRequired,
    size: PropTypes.number,
    className: PropTypes.string,
};

export default Avatar;

import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ src, size = 60 }) => (
    <img
        className="component-avatar"
        src={src}
        style={{ width: size, height: size, borderRadius: size / 2 }}
    />
);
Avatar.propTypes = {
    src: PropTypes.string.isRequired,
    size: PropTypes.number,
};

export default Avatar;

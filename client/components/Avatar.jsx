import React from 'react';
import PropTypes from 'prop-types';

import webpackConfig from '../../config/webpack';
import './components.less';

const env = process.env.NODE_ENV === 'development' ? 'dev' : 'build';
const publishPath = webpackConfig[env].assetsPublicPath + webpackConfig[env].assetsSubDirectory;
const avatarFallback = `${publishPath}/avatar/0.jpg`;
const failTimes = new Map();

function noop() { }

function handleError(e) {
    const times = failTimes.get(e.target) || 0;
    if (times >= 3) {
        return;
    }
    e.target.src = avatarFallback;
    failTimes.set(e.target, times + 1);
}

const Avatar = ({ src, size = 60, onClick = noop, className = '' }) => (
    <img
        className={`component-avatar ${className}`}
        src={src}
        style={{ width: size, height: size, borderRadius: size / 2 }}
        onClick={onClick}
        onError={handleError}
    />
);
Avatar.propTypes = {
    src: PropTypes.string.isRequired,
    size: PropTypes.number,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default Avatar;

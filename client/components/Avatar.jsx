import React from 'react';
import PropTypes from 'prop-types';

import './components.less';

const avatarFallback = 'https://cdn.suisuijiang.com/fiora/avatar/0.jpg';
const failTimes = new Map();

function handleError(e) {
    const times = failTimes.get(e.target) || 0;
    if (times >= 2) {
        return;
    }
    e.target.src = avatarFallback;
    failTimes.set(e.target, times + 1);
}

const Avatar = ({
    src, size, className, ...props
}) => (
    <img
        className={`component-avatar ${className}`}
        style={{ width: size, height: size, borderRadius: size / 2 }}
        src={/(blob|data):/.test(src) ? src : `${src}?imageView2/3/w/${size * 2}/h/${size * 2}`}
        alt="头像图"
        onError={handleError}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
    />
);

Avatar.propTypes = {
    src: PropTypes.string.isRequired,
    size: PropTypes.number,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

Avatar.defaultProps = {
    size: 60,
    className: '',
    onClick: () => {},
};

export default Avatar;

import React from 'react';
import PropTypes from 'prop-types';

import './components.less';

const IconButton = ({
    width, height, icon, iconSize, onClick, style,
}) => (
    <div
        className="component-iconButton"
        style={{ width, height, ...style }}
        onClick={onClick}
        role="button"
    >
        <i
            className={`iconfont icon-${icon}`}
            style={{ fontSize: iconSize, lineHeight: `${height}px` }}
        />
    </div>
);
IconButton.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    iconSize: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object.isRequired,
};

export default IconButton;

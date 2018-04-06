import React from 'react';

import Button from './Button';
import './IconButton.less';


class IconButton extends Button {
    render() {
        const {
            width, height, icon, iconSize, onClick,
        } = this.props;
        return (
            <div className="component-iconButton" style={{ width, height }} onClick={onClick}>
                <i className={`iconfont icon-${icon}`} style={{ fontSize: iconSize, lineHeight: `${height}px` }} />
            </div>
        );
    }
}

export default IconButton;

import React from 'react';

import Button from './Button';
import './components.less';


class IconButton extends Button {
    render() {
        const {
            width, height, icon, iconSize, onClick, style,
        } = this.props;
        return (
            <div className="component-iconButton" style={Object.assign({ width, height }, style)} onClick={onClick}>
                <i className={`iconfont icon-${icon}`} style={{ fontSize: iconSize, lineHeight: `${height}px` }} />
            </div>
        );
    }
}

export default IconButton;

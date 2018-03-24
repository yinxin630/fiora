import React from 'react';

import '@/styles/iconButton.less';
import Button from './Button';


class IconButton extends Button {
    render() {
        const {
            width, height, icon, iconSize, onClick,
        } = this.props;
        return (
            <div className="component-iconButton" style={{ width, height }} onClick={onClick}>
                <i className={`iconfont icon-${icon}`} style={{ fontSize: iconSize, lineHeight: height }} />
            </div>
        );
    }
}

export default IconButton;

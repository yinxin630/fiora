import React from 'react';

import Style from './IconButton.less';

type Props = {
    width: number;
    height: number;
    icon: string;
    iconSize: number;
    className?: string;
    style?: Object;
    onClick?: () => void;
};

function IconButton({
    width,
    height,
    icon,
    iconSize,
    onClick = () => {},
    className = '',
    style = {},
}: Props) {
    return (
        <div
            className={`${Style.iconButton} ${className}`}
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
}

export default IconButton;

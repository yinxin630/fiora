import React from 'react';

import Style from './IconButton.less';

interface IconButtonProps {
    width: number;
    height: number;
    icon: string;
    iconSize: number;
    classname?: string;
    style: Object;
    onClick: () => void;
}

function IconButton(props: IconButtonProps) {
    const { width, height, icon, iconSize, onClick, classname = '', style } = props;
    return (
        <div
            className={`${Style.iconButton} ${classname}`}
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

IconButton.defaultProps = {
    onClick: () => {},
    style: {},
};

export default IconButton;

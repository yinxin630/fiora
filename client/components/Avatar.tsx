import React, { SyntheticEvent } from 'react';

const avatarFallback = '/avatar/0.jpg';
const failTimes = new Map();

/**
 * 处理头像加载失败的情况, 展示默认头像
 * @param e 事件
 */
function handleError(e: SyntheticEvent) {
    const times = failTimes.get(e.target) || 0;
    if (times >= 2) {
        return;
    }
    (e.target as HTMLImageElement).src = avatarFallback;
    failTimes.set(e.target, times + 1);
}

interface AvatarProps {
    /** 头像链接 */
    src: string;
    /** 展示大小 */
    size?: number;
    /** 额外类名 */
    className?: string;
    /** 点击事件 */
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

const noop = () => {};

function Avatar(props: AvatarProps) {
    const {
        src,
        size = 60,
        className = '',
        onClick = noop,
        onMouseEnter = noop,
        onMouseLeave = noop,
    } = props;
    return (
        <img
            className={className}
            style={{ width: size, height: size, borderRadius: size / 2 }}
            src={/(blob|data):/.test(src) ? src : `${src}?imageView2/3/w/${size * 2}/h/${size * 2}`}
            alt=""
            onClick={onClick}
            onError={handleError}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        />
    );
}

export default Avatar;

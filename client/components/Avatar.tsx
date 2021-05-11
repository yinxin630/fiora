import React, { SyntheticEvent, useState, useMemo } from 'react';
import { getOSSFileUrl } from '../../utils/uploadFile';

export const avatarFailback = '/avatar/0.jpg';

type Props = {
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

function Avatar({
    src,
    size = 60,
    className = '',
    onClick,
    onMouseEnter,
    onMouseLeave,
}: Props) {
    const [failTimes, updateFailTimes] = useState(0);

    /**
     * Handle avatar load fail event. Use faillback avatar instead
     * If still fail then ignore error event
     */
    function handleError(e: SyntheticEvent<HTMLImageElement>) {
        if (failTimes >= 2) {
            return;
        }
        e.currentTarget.src = avatarFailback;
        updateFailTimes(failTimes + 1);
    }

    const url = useMemo(() => {
        if (/^(blob|data):/.test(src)) {
            return src;
        }
        return getOSSFileUrl(src, `image/resize,w_${size * 2},h_${size * 2}/quality,q_90`);
    }, [src])

    return (
        <img
            className={className}
            style={{ width: size, height: size, borderRadius: size / 2 }}
            src={url}
            alt=""
            onClick={onClick}
            onError={handleError}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        />
    );
}

export default Avatar;

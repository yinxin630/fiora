import React from 'react';

import Style from './OnlineStatus.less';

interface OnlineStatusProps {
    /** 状态, online / offline */
    status: string;
    className?: string;
}

function OnlineStatus(props: OnlineStatusProps) {
    const { status, className } = props;

    return (
        <div className={`${Style.onlineStatus} ${className}`}>
            <div className={`${Style.status} ${status}`} />
        </div>
    );
}

export default OnlineStatus;

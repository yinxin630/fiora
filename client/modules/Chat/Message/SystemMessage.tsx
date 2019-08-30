import React from 'react';
import { getPerRandomColor } from '../../../../utils/getRandomColor';

interface SystemMessageProps {
    message: string;
    username: string;
}

function SystemMessage(props: SystemMessageProps) {
    const { message, username } = props;
    return (
        <div className="system">
            <span style={{ color: getPerRandomColor(username) }}>{username}</span>
            &nbsp;
            {message}
        </div>
    );
}

export default SystemMessage;

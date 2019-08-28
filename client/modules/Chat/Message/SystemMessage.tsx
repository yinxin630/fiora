import React from 'react';
import randomColor from 'randomcolor';

const getRandomColor = (() => {
    const cache = {};
    return function getColor(key) {
        if (!cache[key]) {
            cache[key] = randomColor();
        }
        return cache[key];
    };
})();

interface SystemMessageProps {
    message: string;
    username: string;
}

function SystemMessage(props: SystemMessageProps) {
    const { message, username } = props;
    return (
        <div className="system">
            <span style={{ color: getRandomColor(username) }}>{username}</span>
            &nbsp;
            {message}
        </div>
    );
}

export default SystemMessage;

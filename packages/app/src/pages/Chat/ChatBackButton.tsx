import React from 'react';
import BackButton from '../../components/BackButton';
import { useStore } from '../../hooks/useStore';

function ChatBackButton() {
    const store = useStore();
    const unread = store.linkmans.reduce((result, linkman) => {
        result += linkman.unread;
        return result;
    }, 0);

    return (
        <BackButton text={unread.toString()} />
    );
}

export default ChatBackButton;

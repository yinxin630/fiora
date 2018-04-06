import React, { Component } from 'react';

import HeaderBar from './HeaderBar';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import './Chat.less';

class Chat extends Component {
    render() {
        return (
            <div className="module-main-chat">
                <HeaderBar />
                <MessageList />
                <ChatInput />
            </div>
        );
    }
}

export default Chat;

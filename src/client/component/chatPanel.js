import React from 'react';
import '../style/chatPanel.scss';

import MessageList from './messageList';
import Toolbar from './toolbar';
import ChatPanelHeader from './chatPanelHeader';
import InputBox from './inputBox';
import GroupSetting from './groupSetting';

class ChatPanel extends React.Component {
    render () {
        return (
            <div className="chat-panel">
                <ChatPanelHeader/>
                <MessageList.container>
                    <MessageList.item self/>
                    <MessageList.item/>
                    <MessageList.item/>
                    <MessageList.item/>
                    <MessageList.item/>
                    <MessageList.item/>
                    <MessageList.item/>
                    <MessageList.item/>
                    <MessageList.item/>
                </MessageList.container>
                <InputBox/>
                <Toolbar/>
            </div>
        );
    }
}

export default ChatPanel;
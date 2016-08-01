import React from 'react';
import '../style/chatPanel.scss';

import MessageList from './messageList';
import Toolbar from './toolbar';
import ChatPanelHeader from './chatPanelHeader';
import InputBox from './inputBox';

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

                <div className="float-panel">
                    <div>
                        <span>群设置</span>
                        <i className="icon">&#xe603;</i>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatPanel;
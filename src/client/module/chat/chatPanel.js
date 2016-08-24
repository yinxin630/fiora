import React from 'react';
import './style/chatPanel.scss';

import { connect } from 'react-redux';
import MessageList from './messageList';
import Toolbar from './toolbar';
import ChatPanelHeader from './chatPanelHeader';
import InputBox from './inputBox';
import GroupSetting from './groupSetting';
import GroupNotice from './groupNotice';
import Expression from './expression';

class ChatPanel extends React.Component {
    render () {
        let { showGroupSetting } = this.props;
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
                <GroupSetting/>
                <GroupNotice/>
                <Expression/>
            </div>
        );
    }
}

export default connect(
    state => ({ })
)(ChatPanel);
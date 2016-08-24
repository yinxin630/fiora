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
    render() {
        let { showGroupSetting, data, me } = this.props;

        return (
            <div className="chat-panel">
                <ChatPanelHeader
                    avatar={data.avatar}
                    name={data.type === 'group' ? data.name : data.username}
                    />
                <MessageList.container>
                    {
                        data.messages.map(message => (
                            <MessageList.item
                                key={`${data.type}_${message._id}`}
                                self={message.from._id === me}
                                avatar={message.from.avatar}
                                name={message.from.username}
                                time={message.createTime}
                                type={message.type}
                                content={message.content}
                                />
                        ))
                    }
                </MessageList.container>
                <InputBox
                    type={data.type}
                    linkmanId={data._id}
                    />
                <Toolbar/>
                <GroupSetting/>
                <GroupNotice/>
                <Expression/>
            </div>
        );
    }
}

export default ChatPanel;
import React from 'react';
import './style/chatPanel.scss';

import pureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import MessageList from './messageList';
import Toolbar from './toolbar';
import ChatPanelHeader from './chatPanelHeader';
import InputBox from './inputBox';
import GroupSetting from './groupSetting';
import GroupNotice from './groupNotice';
import Expression from './expression';

class ChatPanel extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        let { linkman, me } = this.props;
        linkman = linkman.toJS();
        console.log(linkman.messages);

        return (
            <div className="chat-panel">
                <ChatPanelHeader
                    avatar={linkman.avatar}
                    name={linkman.type === 'group' ? linkman.name : linkman.username}
                    />
                <MessageList.container>
                    {
                        linkman.messages.map(message => (
                            <MessageList.item
                                key={`${linkman.type}${message._id}`}
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
                    type={linkman.type}
                    linkmanId={linkman._id}
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
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

        return (
            <div className="chat-panel">
                <ChatPanelHeader
                    avatar={linkman.get('avatar')}
                    name={linkman.get('type') === 'group' ? linkman.get('name') : linkman.get('username')}
                    />
                <MessageList.container>
                    {
                        linkman.get('messages').map(message => (
                            <MessageList.item
                                key={ linkman.get('type') + message.get('_id') }
                                self={ message.getIn(['from', '_id']) === me }
                                message={ message }
                                />
                        ))
                    }
                </MessageList.container>
                <InputBox
                    type={linkman.get('type')}
                    linkmanId={linkman.get('_id')}
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
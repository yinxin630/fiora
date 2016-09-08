import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './style/chatPanel.scss';

import MessageList from './messageList';
import Toolbar from './toolbar';
import ChatPanelHeader from './chatPanelHeader';
import InputBox from './inputBox';
import GroupSetting from './groupSetting';
import GroupNotice from './groupNotice';
import Expression from './expression';
import CodeInput from './codeInput';
import user from '../../action/user';

class ChatPanel extends React.Component {
    static propTypes = {
        linkman: PropTypes.object.isRequired,
        me: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentWillUpdate(nextProps) {
        if (nextProps.linkman.get('unread') > 0 && nextProps.shouldScrollMessage) {
            user.clearUnread(nextProps.linkman.get('type'), nextProps.linkman.get('_id'));
        }
    }

    render() {
        const { linkman, me } = this.props;

        return (
            <div className="chat-panel">
                <ChatPanelHeader
                    avatar={linkman.get('avatar')}
                    name={linkman.get('type') === 'group' ? linkman.get('name') : linkman.get('username')}
                />
                <MessageList.container>
                    {
                        linkman.get('messages').map((message, index) => (
                            <MessageList.item
                                key={linkman.get('type') + message.get('_id')}
                                self={message.getIn(['from', '_id']) === me}
                                message={message}
                                index={index}
                                messageCount={linkman.get('messages').size}
                            />
                        ))
                    }
                </MessageList.container>
                { linkman.get('unread') > 0 ? <div className="new-message">新消息</div> : null }
                <InputBox
                    type={linkman.get('type')}
                    linkmanId={linkman.get('_id')}
                />
                <Toolbar
                    linkmanId={linkman.get('_id')}
                />
                <GroupSetting
                    creator={linkman.get('creator')}
                    me={me}
                    members={linkman.get('members')}
                    linkmanId={linkman.get('_id')}
                />
                <GroupNotice
                    creator={linkman.get('creator')}
                    me={me}
                    linkman={linkman}
                />
                <Expression />
                <CodeInput
                    linkmanId={linkman.get('_id')}
                />
            </div>
        );
    }
}

export default connect(
    state => ({
        shouldScrollMessage: state.getIn(['ui', 'shouldScrollMessage']),
    })
)(ChatPanel);

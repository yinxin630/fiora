import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './chatPanel.scss';

import MessageList from './messageList';
import Toolbar from './toolbar';
import ChatPanelHeader from './chatPanelHeader';
import InputBox from './inputBox';
import GroupSetting from './groupSetting';
import GroupNotice from './groupNotice';
import Expression from './expression';
import CodeInput from './codeInput';
import UserInfo from './userInfo';
import user from '../../../action/user';

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
                    type={linkman.get('type')}
                    linkmanId={linkman.get('_id')}
                />
                <MessageList.container
                    linkmanId={linkman.get('_id')}
                    linkmanType={linkman.get('type')}
                    messagesCount={linkman.get('messages').size}
                >
                    {
                        linkman.get('messages').map((message) => (
                            <MessageList.item
                                key={linkman.get('type') + message.get('_id')}
                                me={me}
                                message={message}
                            />
                        ))
                    }
                </MessageList.container>
                <Toolbar
                    linkmanType={linkman.get('type')}
                    linkmanId={linkman.get('_id')}
                />
                <InputBox
                    type={linkman.get('type')}
                    linkmanId={linkman.get('_id')}
                />
                {
                    linkman.get('type') === 'group' ?
                        <GroupSetting
                            creator={linkman.get('creator')}
                            me={me}
                            members={linkman.get('members')}
                            linkmanId={linkman.get('_id')}
                        />
                    :
                        null
                }
                {
                    linkman.get('type') === 'group' ?
                        <GroupNotice
                            creator={linkman.get('creator')}
                            me={me}
                            linkman={linkman}
                        />
                    :
                        null
                }
                <Expression
                    linkmanType={linkman.get('type')}
                    linkmanId={linkman.get('_id')}
                />
                <CodeInput
                    linkmanType={linkman.get('type')}
                    linkmanId={linkman.get('_id')}
                />
                <UserInfo />
            </div>
        );
    }
}

export default connect(
    state => ({
        shouldScrollMessage: state.getIn(['ui', 'shouldScrollMessage']),
    })
)(ChatPanel);

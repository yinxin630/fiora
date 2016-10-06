import React, { PropTypes } from 'react';
import moment from 'moment';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './userList.scss';

import Avatar from '../../../common/avatar';
import user from '../../../action/user';
import api from '../../../api';

class UserList extends React.Component {
    static propTypes = {
        children: PropTypes.object,
    };

    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div className="user-list">
                { this.props.children }
            </div>
        );
    }
}

class User extends React.Component {
    static propTypes = {
        linkman: PropTypes.object,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.handleUserListItemClick = this.handleUserListItemClick.bind(this);
    }

    handleUserListItemClick() {
        const { linkman } = this.props;
        this.context.router.push(`/main/chat/${linkman.get('type')}/${linkman.get('_id')}`);
        user.clearUnread(linkman.get('type'), linkman.get('_id'));
    }

    render() {
        const { linkman } = this.props;
        const isGroup = linkman.get('type') === 'group';
        const messagesLength = linkman.get('messages').size;
        const time = moment(messagesLength === 0 ? linkman.get('createTime') : linkman.getIn(['messages', messagesLength - 1, 'createTime'])).format('HH:mm');
        const message = messagesLength === 0 ? null : linkman.getIn(['messages', messagesLength - 1]);
        const unread = linkman.get('unread') > 99 ? 99 : linkman.get('unread');
        let content = '';
        if (!message) {
            content = '...';
        }
        else {
            if (message.get('type') === 'text') {
                const text = message.get('content');
                const PluginMessageInfo = api.getVirtualMessageName(text);
                if (PluginMessageInfo) {
                    content = PluginMessageInfo.content;
                } else {
                    content = `${message.getIn(['from', 'username'])}: ${text}`;
                }
            }
            else {
                content = `${message.getIn(['from', 'username'])}: [${message.get('type')}]`;
            }
        }

        return (
            <div
                className="user-list-item"
                onClick={this.handleUserListItemClick}
            >
                <Avatar
                    avatar={linkman.get('avatar')}
                    name={isGroup ? linkman.get('name') : linkman.get('username')}
                    width={40}
                    height={40}
                />
                { unread > 0 ? <div className="unread">{ unread }</div> : null }
                <div className="content">
                    <div>
                        <p>{ isGroup ? linkman.get('name') : linkman.get('username') }</p>
                        <p>{ time }</p>
                    </div>
                    <div>
                        <p>{ content }</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default {
    container: UserList,
    item: User,
};

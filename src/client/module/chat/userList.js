import React from 'react';
import './style/userList.scss';

import moment from 'moment';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import Avatar from './avatar';
import user from '../../action/user';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }
    
    render () {
        return (
            <div className="user-list">
                { this.props.children }
            </div>
        );
    }
}

class User extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render () {
        
        let { linkman } = this.props;
        const isGroup = linkman.get('type') === 'group';
        const messagesLength = linkman.get('messages').size;
        const time = moment(messagesLength === 0 ? linkman.get('createTime') : linkman.getIn(['messages', messagesLength - 1, 'createTime'])).format('hh:mm');
        const message = messagesLength === 0 ? null : linkman.getIn(['messages', messagesLength - 1]);

        return (
            <div 
            className="user-list-item"
            onClick={() => this.context.router.push(`/chat/${linkman.get('type')}/${linkman.get('_id')}`)}
            >
                <Avatar
                    avatar={linkman.get('avatar')}
                    name={isGroup ? linkman.get('name') : linkman.get('username')}
                    width={40}
                    height={40}
                />
                <div>
                    <div>
                        <p>{ isGroup ? linkman.get('name') : linkman.get('username') }</p>
                        <p>{ time }</p>
                    </div>
                    <div>
                        <p>{ `${message ? message.getIn(['from', 'username']) + ': ' + message.get('content') : '...'}` }</p>
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
import React from 'react';
import './style/userList.scss';

import moment from 'moment';

import Avatar from './avatar'

class UserList extends React.Component {
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

    render () {
        const { data } = this.props;
        const isGroup = data.type === 'group';
        const time = moment(data.messages.length === 0 ? Date.now() : data.messages[data.messages.length - 1].createTime).format('hh:mm');
        const message = data.messages.length === 0 ? '无消息' : data.messages[data.messages.length - 1].content;

        return (
            <div 
            className="user-list-item"
            onClick={() => this.context.router.push(`/chat/${data.type}/${data._id}`)}
            >
                <Avatar
                    avatar={data.avatar}
                    name={isGroup === 'group' ? data.name : data.username}
                    width={40}
                    height={40}
                />
                <div>
                    <div>
                        <p>{ isGroup ? data.name : data.username }</p>
                        <p>{ time }</p>
                    </div>
                    <div>
                        <p>{ message }</p>
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
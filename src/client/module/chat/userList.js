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
        linkman = linkman.toJS();
        const isGroup = linkman.type === 'group';
        const time = moment(linkman.messages.length === 0 ? linkman.createTime : linkman.messages[linkman.messages.length - 1].createTime).format('hh:mm');
        const message = linkman.messages.length === 0 ? '无消息' : linkman.messages[linkman.messages.length - 1].content;

        return (
            <div 
            className="user-list-item"
            onClick={() => this.context.router.push(`/chat/${linkman.type}/${linkman._id}`)}
            >
                <Avatar
                    avatar={linkman.avatar}
                    name={isGroup === 'group' ? linkman.name : linkman.username}
                    width={40}
                    height={40}
                />
                <div>
                    <div>
                        <p>{ isGroup ? linkman.name : linkman.username }</p>
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
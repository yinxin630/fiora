import React from 'react';
import './style/messageList.scss';

import pureRenderMixin from 'react-addons-pure-render-mixin';
import moment from 'moment';
import Avatar from './avatar';

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div className="message-list">
                { this.props.children }
            </div>
        );
    }
}

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        let { self, message } = this.props;

        return (
            <div className={ `message-list-item ${self ? 'message-self' : ''}` }>
                <Avatar
                    avatar={message.getIn(['from', 'avatar'])}
                    name={message.getIn(['from', 'username'])}
                    width={40}
                    height={40}
                    />
                <div>
                    <div>
                        <span>{ message.getIn(['from', 'username']) }</span>
                        <span>{ moment(message.get('createTime')).format('hh:mm') }</span>
                    </div>
                    <div>
                        { message.get('content') }
                    </div>
                </div>
            </div>
        );
    }
}

export default {
    container: MessageList,
    item: Message,
};
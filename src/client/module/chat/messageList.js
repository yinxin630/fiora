import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';
import moment from 'moment';

import './style/messageList.scss';

import Avatar from './avatar';

class MessageList extends React.Component {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.element),
    };

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
    static propTypes = {
        self: PropTypes.bool.isRequired,
        message: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const { self, message } = this.props;

        return (
            <div className={`message-list-item ${self ? 'message-self' : ''}`}>
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

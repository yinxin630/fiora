import React, { Component } from 'react';
import { connect } from 'react-redux';
import immutable from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Message from './Message';


class MessageList extends Component {
    static propTypes = {
        self: PropTypes.string,
        messages: ImmutablePropTypes.list,
    }
    renderMessage(message) {
        const { self } = this.props;
        return (
            <Message
                key={message.get('_id')}
                avatar={message.getIn(['from', 'avatar'])}
                nickname={message.getIn(['from', 'username'])}
                time={new Date(message.get('createTime'))}
                type={message.get('type')}
                content={message.get('content')}
                isSelf={self === message.getIn(['from', '_id'])}
                loading={message.get('loading')}
                percent={message.get('percent')}
            />
        );
    }
    render() {
        const { messages } = this.props;
        return (
            <div className="chat-messageList">
                {
                    messages.map(message => (
                        this.renderMessage(message)
                    ))
                }
            </div>
        );
    }
}

export default connect((state) => {
    const isLogin = !!state.getIn(['user', '_id']);
    let messages = immutable.fromJS([]);
    if (!isLogin) {
        const defaultGroupMessages = state.getIn(['user', 'groups', 0, 'messages']);
        return {
            self: '',
            messages: defaultGroupMessages || messages,
        };
    }

    const self = state.getIn(['user', '_id']);
    const focusGroup = state.get('focusGroup');
    const group = state.getIn(['user', 'groups']).find(g => g.get('_id') === focusGroup);
    if (group) {
        messages = group.get('messages');
    }

    return {
        self,
        messages,
    };
})(MessageList);

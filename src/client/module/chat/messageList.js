import React from 'react';
import './style/messageList.scss';

import pureRenderMixin from 'react-addons-pure-render-mixin';

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }
    
    render () {
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

    render () {
        let { key, self, avatar, name, time, type, content } = this.props;

        return (
            <div className={ `message-list-item ${ self ? 'message-self': '' }` }>
                <img src={ avatar }/>
                <div>
                    <div>
                        <span>{ name }</span>
                        <span>{ time }</span>
                    </div>
                    <div>
                        { content }
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
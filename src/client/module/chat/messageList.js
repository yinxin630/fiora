import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';
import moment from 'moment';

import './style/messageList.scss';

import Avatar from './avatar';
import expressions from '../../util/expressions';

class MessageList extends React.Component {
    static propTypes = {
        children: PropTypes.object,
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
        this.renderContent = this.renderContent.bind(this);
    }

    componentDidMount() {
        this.dom.scrollIntoView();
    }

    renderContent(content) {
        content = content.replace(
            /#\(([\u4e00-\u9fa5a-z]+)\)/g,
            (r, e) => `<img class="expression-message" src="data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw==" style="background-position: left ${-30 * expressions.indexOf(e)}px" onerror="this.style.display=\'none\'">`
        );

        return (
            <div
                dangerouslySetInnerHTML={{ __html: content }}
            />
        );
    }

    render() {
        const { self, message } = this.props;

        return (
            <div
                className={`message-list-item ${self ? 'message-self' : ''}`}
                ref={dom => this.dom = dom}
            >
                <Avatar
                    avatar={message.getIn(['from', 'avatar'])}
                    name={message.getIn(['from', 'username'])}
                    width={40}
                    height={40}
                />
                <div>
                    <div>
                        <span>{ message.getIn(['from', 'username']) }</span>
                        <span>{ moment(message.get('createTime')).format('HH:mm') }</span>
                    </div>
                    { this.renderContent(message.get('content')) }
                </div>
            </div>
        );
    }
}

export default {
    container: MessageList,
    item: Message,
};

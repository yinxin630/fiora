import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';
import moment from 'moment';
import { connect } from 'react-redux';

import './style/messageList.scss';

import Avatar from './avatar';
import expressions from '../../util/expressions';
import ui from '../../action/ui';

let onScrollHandle = null;

class MessageList extends React.Component {
    static propTypes = {
        children: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.handleOnScroll = this.handleOnScroll.bind(this);
    }

    handleOnScroll() {
        if (onScrollHandle) {
            clearTimeout(onScrollHandle);
        }
        onScrollHandle = setTimeout(() => {
            ui.changeScroll(
                this.list.scrollHeight,
                this.list.scrollTop,
                this.list.clientHeight
            );
        }, 100);
    }

    render() {
        return (
            <div
                className="message-list"
                ref={list => this.list = list}
                onScroll={this.handleOnScroll}
            >
                { this.props.children }
            </div>
        );
    }
}

class Message extends React.Component {
    static propTypes = {
        self: PropTypes.bool.isRequired,
        message: PropTypes.object.isRequired,
        messageListScrollHeight: PropTypes.number,
        messageListScrollTop: PropTypes.number,
        messageListClientHeight: PropTypes.number,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.renderContent = this.renderContent.bind(this);
    }

    componentDidMount() {
        if (this.props.messageListScrollHeight - this.props.messageListScrollTop - this.props.messageListClientHeight < 150) {
            this.dom.scrollIntoView();
        }
    }

    renderContent(type, content) {
        if (type === 'text') {
            content = content.replace(
                /#\(([\u4e00-\u9fa5a-z]+)\)/g,
                (r, e) => `<img class="expression-message" src="data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw==" style="background-position: left ${-30 * expressions.indexOf(e)}px" onerror="this.style.display=\'none\'">`
            );

            return (
                <div
                    className="text"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            );
        }
        else if (type === 'image') {
            return (
                <div
                    className="image"
                >
                    <img
                        src={content}
                        onLoad={() => this.dom.scrollIntoView()}
                    />
                </div>
            );
        }
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
                    { this.renderContent(message.get('type'), message.get('content')) }
                </div>
            </div>
        );
    }
}

export default {
    container: MessageList,
    item: connect(
        state => ({
            messageListScrollHeight: state.getIn(['ui', 'messageListScrollHeight']),
            messageListScrollTop: state.getIn(['ui', 'messageListScrollTop']),
            messageListClientHeight: state.getIn(['ui', 'messageListClientHeight']),
        })
    )(Message),
};

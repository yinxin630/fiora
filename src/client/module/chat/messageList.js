import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';
import moment from 'moment';
import { connect } from 'react-redux';
import Highlight from 'react-highlight';

import './style/messageList.scss';

import Avatar from './avatar';
import expressions from '../../util/expressions';
import ui from '../../action/ui';
import mask from '../../util/mask';

let onScrollHandle = null;
let scrollMessage = null;

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
            ui.shouldScrollMessage(this.list.scrollHeight - this.list.scrollTop - this.list.clientHeight < this.list.clientHeight);
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
        me: PropTypes.string.isRequired,
        message: PropTypes.object.isRequired,
        shouldScrollMessage: PropTypes.bool,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.handleAvatarClick = this.handleAvatarClick.bind(this);
    }

    componentDidMount() {
        const { shouldScrollMessage, message, me } = this.props;
        if (shouldScrollMessage || message.getIn(['from', '_id']) === me) {
            scrollMessage = () => this.dom.scrollIntoView(false);
            scrollMessage();
        }
    }

    handleAvatarClick() {
        ui.openUserInfo(this.props.message.get('from'));
        mask(ui.closeUserInfo);
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
                        ref={img => this.img = img}
                        onLoad={() => scrollMessage && scrollMessage()}
                        onError={() => this.img.src = 'http://od8dycy67.bkt.clouddn.com/image_not_found.png'}
                    />
                </div>
            );
        }
        else if (type === 'code') {
            return (
                <div
                    className="code"
                >
                    <Highlight>
                        {content}
                    </Highlight>
                </div>
            );
        }
        else if (type === 'url') {
            return (
                <div
                    className="url"
                >
                    <a
                        href={content}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        { content }
                    </a>
                </div>
            );
        }

        return (
            <div
                className="unknown"
            >
                不支持的消息类型
            </div>
        );
    }

    render() {
        const { me, message } = this.props;

        return (
            <div
                className={`message-list-item ${message.getIn(['from', '_id']) === me ? 'message-self' : ''}`}
                ref={dom => this.dom = dom}
            >
                <Avatar
                    avatar={message.getIn(['from', 'avatar'])}
                    name={message.getIn(['from', 'username'])}
                    width={40}
                    height={40}
                    onClick={this.handleAvatarClick}
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
            shouldScrollMessage: state.getIn(['ui', 'shouldScrollMessage']),
        })
    )(Message),
};

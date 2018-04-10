import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';

import Avatar from '@/components/Avatar';
import expressions from '../../../../../utils/expressions';

const transparentImage = 'data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw==';
const baidu = require('@/assets/images/baidu.png');

@immutableRenderDecorator
class Message extends Component {
    static propTypes = {
        avatar: PropTypes.string.isRequired,
        nickname: PropTypes.string.isRequired,
        time: PropTypes.object.isRequired,
        type: PropTypes.oneOf(['text']),
        content: PropTypes.string.isRequired,
        isSelf: PropTypes.bool,
    }
    static defaultProps = {
        isSelf: false,
    }
    static formatTime(time) {
        return `${time.getHours()}:${time.getMinutes()}`;
    }
    static convertExpression(txt) {
        return txt.replace(
            /#\(([\u4e00-\u9fa5a-z]+)\)/g,
            (r, e) => {
                const index = expressions.default.indexOf(e);
                if (index !== -1) {
                    return `<img class="expression-baidu" src="${transparentImage}" style="background-position: left ${-30 * index}px; background-image: url(${baidu})" onerror="this.style.display='none'" alt="${r}">`;
                }
                return r;
            },
        );
    }
    componentDidMount() {
        this.dom.scrollIntoView();
    }
    renderText() {
        const { content } = this.props;
        return (
            <div className="text" dangerouslySetInnerHTML={{ __html: Message.convertExpression(content) }} />
        );
    }
    renderContent() {
        const { type } = this.props;
        switch (type) {
        case 'text': {
            return this.renderText();
        }
        default:
            return (
                <div className="unknown">不支持的消息类型</div>
            );
        }
    }
    render() {
        const {
            avatar, nickname, time, type, isSelf,
        } = this.props;
        return (
            <div className={`chat-message ${isSelf ? 'self' : ''} ${type}`} ref={i => this.dom = i}>
                <Avatar className="avatar" src={avatar} size={44} />
                <div className="right">
                    <div className="nickname-time">
                        <span className="nickname">{nickname}</span>
                        <span className="time">{Message.formatTime(time)}</span>
                    </div>
                    <div className="content">{this.renderContent()}</div>
                    <div className="arrow" />
                </div>
            </div>
        );
    }
}

export default Message;

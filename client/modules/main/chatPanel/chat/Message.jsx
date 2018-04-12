import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';

import Avatar from '@/components/Avatar';
import { Circle } from '@/components/Progress';
import expressions from '../../../../../utils/expressions';

const Prism = require('prismjs/components/prism-core.js');
require('prismjs/themes/prism.css');

/* 要使用的语言及其前置语言 */
require('prismjs/components/prism-clike');
require('prismjs/components/prism-javascript');
require('prismjs/components/prism-typescript');
require('prismjs/components/prism-java');
require('prismjs/components/prism-c');
require('prismjs/components/prism-cpp');
require('prismjs/components/prism-python');
require('prismjs/components/prism-ruby');
require('prismjs/components/prism-markup');
require('prismjs/components/prism-markup-templating');
require('prismjs/components/prism-php');
require('prismjs/components/prism-go');
require('prismjs/components/prism-csharp');
require('prismjs/components/prism-css');
require('prismjs/components/prism-markdown');
require('prismjs/components/prism-sql');
require('prismjs/components/prism-json');

const transparentImage = 'data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw==';
const languagesMap = {
    javascript: 'javascript',
    typescript: 'typescript',
    java: 'java',
    c_cpp: 'cpp',
    python: 'python',
    ruby: 'ruby',
    php: 'php',
    golang: 'go',
    csharp: 'csharp',
    html: 'html',
    css: 'css',
    markdown: 'markdown',
    sql: 'sql',
    json: 'json',
};

@immutableRenderDecorator
class Message extends Component {
    static propTypes = {
        avatar: PropTypes.string.isRequired,
        nickname: PropTypes.string.isRequired,
        time: PropTypes.object.isRequired,
        type: PropTypes.oneOf(['text', 'image', 'url', 'code']),
        content: PropTypes.string.isRequired,
        isSelf: PropTypes.bool,
        loading: PropTypes.bool,
        percent: PropTypes.number,
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
                    return `<img class="expression-baidu" src="${transparentImage}" style="background-position: left ${-30 * index}px;" onerror="this.style.display='none'" alt="${r}">`;
                }
                return r;
            },
        );
    }
    componentDidMount() {
        const { type, content } = this.props;
        if (type === 'image') {
            let maxWidth = this.dom.clientWidth - 100;
            const maxHeight = 400;
            if (maxWidth > 500) {
                maxWidth = 500;
            }

            const $image = this.dom.querySelector('.img');
            const parseResult = /width=([0-9]+)&height=([0-9]+)/.exec(content);
            if (parseResult) {
                const [, width, height] = parseResult;
                let scale = 1;
                if (width * scale > maxWidth) {
                    scale = maxWidth / width;
                }
                if (height * scale > maxHeight) {
                    scale = maxHeight / height;
                }
                $image.width = width * scale;
                $image.height = height * scale;
            }
        }
        this.dom.scrollIntoView();
    }
    renderText() {
        const { content } = this.props;
        return (
            <div className="text" dangerouslySetInnerHTML={{ __html: Message.convertExpression(content) }} />
        );
    }
    renderImage() {
        const { content, loading, percent } = this.props;
        let src = content;
        if (src.startsWith('blob')) {
            [src] = src.split('?');
        }
        // 设置高度宽度为1防止被原图撑起来
        return (
            <div className={`image ${loading ? 'loading' : ''}`}>
                <img className="img" src={src} width="1" height="1" />
                <Circle className="progress" percent={percent} strokeWidth="5" strokeColor="#a0c672" trailWidth="5" />
                <div className="progress-number">{Math.ceil(percent)}%</div>
            </div>
        );
    }
    renderCode() {
        const { content } = this.props;
        const parseResult = /@language=([_a-z]+)@/.exec(content);
        if (!parseResult) {
            return (
                <pre className="code">不支持的编程语言</pre>
            );
        }

        const language = languagesMap[parseResult[1]];
        const transferContent = content
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');
        const html = Prism.highlight(transferContent.replace(/@language=[_a-z]+@/, ''), Prism.languages[language], language);
        return (
            <pre className="code" dangerouslySetInnerHTML={{ __html: html }} />
        );
    }
    renderUrl() {
        const { content } = this.props;
        return (
            <a href={content} target="_black" rel="noopener noreferrer" >{content}</a>
        );
    }
    renderContent() {
        const { type } = this.props;
        switch (type) {
        case 'text': {
            return this.renderText();
        }
        case 'image': {
            return this.renderImage();
        }
        case 'code': {
            return this.renderCode();
        }
        case 'url': {
            return this.renderUrl();
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

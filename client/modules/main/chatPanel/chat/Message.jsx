import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Viewer from 'react-viewer';
import Prism from 'prismjs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import randomColor from 'randomcolor';
import 'react-viewer/dist/index.css';

import Time from '../../../../../utils/time';
import expressions from '../../../../../utils/expressions';
import fetch from '../../../../../utils/fetch';
import { isMobile } from '../../../../../utils/ua';
import Avatar from '../../../../components/Avatar';
import Dialog from '../../../../components/Dialog';
import MessageBox from '../../../../components/Message';
import Button from '../../../../components/Button';
import action from '../../../../state/action';
import { CircleProgress } from '../../../../components';

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

const getRandomColor = (() => {
    const cache = {};
    return function getColor(key) {
        if (!cache[key]) {
            cache[key] = randomColor();
        }
        return cache[key];
    };
})();

class Message extends Component {
    static formatTime(time) {
        const nowTime = new Date();
        if (Time.isToday(nowTime, time)) {
            return Time.getHourMinute(time);
        }
        if (Time.isYesterday(nowTime, time)) {
            return `昨天 ${Time.getHourMinute(time)}`;
        }
        return `${Time.getMonthDate(time)} ${Time.getHourMinute(time)}`;
    }

    static convertExpression(txt) {
        return txt.replace(/#\(([\u4e00-\u9fa5a-z]+)\)/g, (r, e) => {
            const index = expressions.default.indexOf(e);
            if (index !== -1) {
                return `<img class="expression-baidu" src="${transparentImage}" style="background-position: left ${-30
                    * index}px;" onerror="this.style.display='none'" alt="${r}">`;
            }
            return r;
        });
    }

    static propTypes = {
        avatar: PropTypes.string.isRequired,
        nickname: PropTypes.string.isRequired,
        originNickname: PropTypes.string,
        // eslint-disable-next-line react/forbid-prop-types
        time: PropTypes.object.isRequired,
        type: PropTypes.oneOf(['text', 'image', 'url', 'code', 'invite', 'system']).isRequired,
        content: PropTypes.string.isRequired,
        isSelf: PropTypes.bool,
        loading: PropTypes.bool.isRequired,
        percent: PropTypes.number.isRequired,
        openUserInfoDialog: PropTypes.func.isRequired,
        shouldScroll: PropTypes.bool.isRequired,
        tag: PropTypes.string.isRequired,
    };

    static defaultProps = {
        isSelf: false,
        originNickname: '',
    };

    constructor(props) {
        super(props);
        this.state = {};
        if (props.type === 'code') {
            this.state.showCode = false;
        } else if (props.type === 'iamge') {
            this.state.showImage = false;
        }
    }

    componentDidMount() {
        const {
            type, content, shouldScroll, isSelf,
        } = this.props;
        if (type === 'image') {
            let maxWidth = this.dom.clientWidth - 100;
            const maxHeight = 200;
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
                $image.src = /^(blob|data):/.test(content)
                    ? content.split('?')[0]
                    : `${content}&imageView2/3/w/${Math.floor($image.width * 1.2)}/h/${Math.floor(
                        $image.height * 1.2,
                    )}`;
            }
        }
        if (shouldScroll || isSelf) {
            this.dom.scrollIntoView();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { avatar, loading, percent } = this.props;
        const { showCode, showImage } = this.state;
        return !(
            avatar === nextProps.avatar
            && loading === nextProps.loading
            && percent === nextProps.percent
            && showCode === nextState.showCode
            && showImage === nextState.showImage
        );
    }

    showCode = () => {
        this.setState({
            showCode: true,
        });
    };

    hideCode = () => {
        this.setState({
            showCode: false,
        });
    };

    showImageViewer = () => {
        this.setState({
            showImage: true,
        });
    };

    hideImageViewer = () => {
        this.setState({
            showImage: false,
        });
    };

    handleClickAvatar = () => {
        const { isSelf, openUserInfoDialog, type } = this.props;
        if (!isSelf && type !== 'system') {
            openUserInfoDialog();
        }
    };

    joinGroup = async () => {
        // eslint-disable-next-line react/destructuring-assignment
        const inviteInfo = JSON.parse(this.props.content);

        const [err, res] = await fetch('joinGroup', { groupId: inviteInfo.groupId });
        if (!err) {
            res.type = 'group';
            action.addLinkman(res, true);
            MessageBox.success('加入群组成功');
            const [err2, messages] = await fetch('getLinkmanHistoryMessages', {
                linkmanId: res._id,
                existCount: 0,
            });
            if (!err2) {
                action.addLinkmanMessages(res._id, messages);
            }
        }
    };

    renderText() {
        let { content } = this.props;
        content = content.replace(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g,
            (r) => `<a href="${r}" rel="noopener noreferrer" target="_blank">${r}</a>`,
        );
        return (
            <div
                className="text"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: Message.convertExpression(content) }}
            />
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
            <div
                className={`image ${loading ? 'loading' : ''} ${
                    /huaji=true/.test(content) ? 'huaji' : ''
                }`}
            >
                <img
                    className="img"
                    src={transparentImage}
                    alt="消息图片"
                    width="1"
                    height="1"
                    onClick={() => isMobile && this.showImageViewer()}
                    onDoubleClick={() => !isMobile && this.showImageViewer()}
                    referrerPolicy="no-referrer"
                />
                <CircleProgress
                    className="progress"
                    percent={percent}
                    strokeWidth="5"
                    strokeColor="#a0c672"
                    trailWidth="5"
                />
                <div className="progress-number">{Math.ceil(percent)}%</div>
                <Viewer
                    // eslint-disable-next-line react/destructuring-assignment
                    visible={this.state.showImage}
                    onClose={this.hideImageViewer}
                    onMaskClick={this.hideImageViewer}
                    images={[{ src, alt: src }]}
                    noNavbar
                />
            </div>
        );
    }

    renderCode() {
        const { content } = this.props;
        const { showCode } = this.state;
        const parseResult = /@language=([_a-z]+)@/.exec(content);
        if (!parseResult) {
            return <pre className="code">不支持的编程语言</pre>;
        }

        const language = languagesMap[parseResult[1]];
        const transferContent = content;
        const rawCode = transferContent.replace(/@language=[_a-z]+@/, '');
        const html = Prism.highlight(rawCode, Prism.languages[language]);
        setTimeout(Prism.highlightAll.bind(Prism), 0); // https://github.com/PrismJS/prism/issues/1487
        let size = `${rawCode.length}B`;
        if (rawCode.length > 1024) {
            size = `${Math.ceil((rawCode.length / 1024) * 100) / 100}KB`;
        }
        return (
            <div className="code">
                <div className="button" onClick={this.showCode} role="button">
                    <div>
                        <div className="icon">
                            <i className="iconfont icon-code" />
                        </div>
                        <div className="code-info">
                            <span>{language}</span>
                            <span>{size}</span>
                        </div>
                    </div>
                    <p>查看</p>
                </div>
                <Dialog
                    className="code-viewer"
                    title="查看代码"
                    visible={showCode}
                    onClose={this.hideCode}
                >
                    <CopyToClipboard text={rawCode}>
                        <Button onClick={() => MessageBox.success('已复制代码到粘贴板')}>
                            复制
                        </Button>
                    </CopyToClipboard>
                    <pre className="pre line-numbers">
                        <code
                            className={`language-${language}`}
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                    </pre>
                </Dialog>
            </div>
        );
    }

    renderUrl() {
        const { content } = this.props;
        return (
            <a href={content} target="_black" rel="noopener noreferrer">
                {content}
            </a>
        );
    }

    renderInvite() {
        // eslint-disable-next-line react/destructuring-assignment
        const inviteInfo = JSON.parse(this.props.content);
        return (
            <div className="invite" onClick={this.joinGroup} role="button">
                <div>
                    <span>
                        &quot;{inviteInfo.inviter}&quot; 邀请你加入群组「{inviteInfo.groupName}」
                    </span>
                </div>
                <p>加入</p>
            </div>
        );
    }

    renderSystem() {
        const { content, originNickname } = this.props;
        return (
            <div className="system">
                <span style={{ color: getRandomColor(originNickname) }}>{originNickname}</span>
                &nbsp;
                {content}
            </div>
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
            case 'invite': {
                return this.renderInvite();
            }
            case 'system': {
                return this.renderSystem();
            }
            default:
                return <div className="unknown">不支持的消息类型</div>;
        }
    }

    render() {
        const {
            avatar, nickname, isSelf, time, type, tag,
        } = this.props;

        return (
            <div
                className={`chat-message ${isSelf ? 'self' : ''} ${type}`}
                ref={(i) => {
                    this.dom = i;
                }}
            >
                <Avatar
                    className="avatar"
                    src={avatar}
                    size={44}
                    onClick={this.handleClickAvatar}
                />
                <div className="right">
                    <div className="nickname-time">
                        <span className="tag" style={{ display: tag ? 'inline-block' : 'none' }}>
                            {tag}
                        </span>
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

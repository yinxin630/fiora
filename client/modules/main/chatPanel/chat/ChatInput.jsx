import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';

import action from '@/state/action';
import IconButton from '@/components/IconButton';
import Dropdown from '@/components/Dropdown';
import { Menu, MenuItem } from '@/components/Menu';
import Dialog from '@/components/Dialog';
import Message from '@/components/Message';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import Avatar from '@/components/Avatar';

import getRandomHuaji from 'utils/getRandomHuaji';
import readDiskFile from 'utils/readDiskFile';
import fetch from 'utils/fetch';
import uploadFile from 'utils/uploadFile';

import Expression from './Expression';
import CodeEditor from './CodeEditor';
import config from '../../../../../config/client';

const xss = require('utils/xss');
const Url = require('utils/url');

@immutableRenderDecorator
class ChatInput extends Component {
    static handleLogin() {
        action.showLoginDialog();
    }
    static insertAtCursor(input, value) {
        if (document.selection) {
            input.focus();
            const sel = document.selection.createRange();
            sel.text = value;
            sel.select();
        } else if (input.selectionStart || input.selectionStart === '0') {
            const startPos = input.selectionStart;
            const endPos = input.selectionEnd;
            const restoreTop = input.scrollTop;
            input.value = input.value.substring(0, startPos) + value + input.value.substring(endPos, input.value.length);
            if (restoreTop > 0) {
                input.scrollTop = restoreTop;
            }
            input.focus();
            input.selectionStart = startPos + value.length;
            input.selectionEnd = startPos + value.length;
        } else {
            input.value += value;
            input.focus();
        }
    }
    static compressImage(image, mimeType, quality = 1) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0);
            canvas.toBlob(resolve, mimeType, quality);
        });
    }
    static propTypes = {
        isLogin: PropTypes.bool.isRequired,
        focus: PropTypes.string,
        connect: PropTypes.bool,
        members: ImmutablePropTypes.list,
        userId: PropTypes.string,
        userName: PropTypes.string,
        userAvatar: PropTypes.string,
    }
    constructor(...args) {
        super(...args);
        this.state = {
            expressionVisible: false,
            codeInputVisible: false,
            expressionSearchVisible: false,
            expressionSearchLoading: false,
            expressionSearchResults: [],

            at: false, // 是否处于@输入中
            atContent: '', // @内容
        };
        this.ime = false;
    }
    componentDidUpdate(prevProps) {
        if (this.props.focus !== prevProps.focus && this.message) {
            this.message.focus();
        }
    }
    getSuggestion = () => this.props.members.filter((member) => {
        const regex = new RegExp(`^${this.state.atContent}`);
        if (regex.test(member.getIn(['user', 'username']))) {
            return true;
        }
        return false;
    })
    handleVisibleChange = (visible) => {
        this.setState({
            expressionVisible: visible,
        });
    }
    handleFeatureMenuClick = ({ key }) => {
        switch (key) {
        case 'image': {
            this.handleSelectFile();
            break;
        }
        case 'huaji': {
            this.sendHuaji();
            break;
        }
        case 'code': {
            this.setState({
                codeInputVisible: true,
            });
            break;
        }
        case 'expression': {
            this.setState({
                expressionSearchVisible: true,
            });
            break;
        }
        default:
        }
    }
    handleCodeEditorClose = () => {
        this.setState({
            codeInputVisible: false,
        });
    }
    closeExpressionSearch = () => {
        this.setState({
            expressionSearchVisible: false,
        });
    }
    handleSendCode = () => {
        if (!this.props.connect) {
            return Message.error('发送消息失败, 您当前处于离线状态');
        }

        const language = this.codeEditor.getLanguage();
        const rawCode = this.codeEditor.getValue();
        if (rawCode === '') {
            return Message.warning('请输入内容');
        }

        const code = `@language=${language}@${rawCode}`;
        const id = this.addSelfMessage('code', code);
        this.sendMessage(id, 'code', code);
        this.codeEditor.clear();
        // 不加延时就清不掉内容
        setTimeout(() => {
            this.handleCodeEditorClose();
        }, 0);
    }
    handleInputKeyDown = async (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
        } else if (e.key === 'Enter' && !this.ime) {
            this.sendTextMessage();
        } else if (e.altKey && (e.key === 's' || e.key === 'ß')) {
            this.sendHuaji();
            e.preventDefault();
        } else if (e.altKey && (e.key === 'd' || e.key === '∂')) {
            this.setState({
                expressionSearchVisible: true,
            });
        } else if (e.key === '@') { // 如果按下@建, 则进入@计算模式
            if (!/@/.test(this.message.value)) {
                this.setState({
                    at: true,
                    atContent: '',
                });
                const { focus } = this.props;
                const [err, result] = await fetch('getGroupOnlineMembers', { groupId: focus });
                if (!err) {
                    action.setGroupMembers(focus, result);
                }
            }
        } else if (this.state.at) { // 如果处于@计算模式
            const { key } = e;
            // 延时, 以便拿到新的value和ime状态
            setTimeout(() => {
                // 如果@已经被删掉了, 退出@计算模式
                if (!/@/.test(this.message.value)) {
                    this.setState({
                        at: false,
                        atContent: '',
                    });
                    return;
                }
                // 如果是输入中文, 并且不是空格键, 忽略输入
                if (this.ime && key !== ' ') {
                    return;
                }
                // 如果是不是输入中文, 并且是空格键, 则@计算模式结束
                if (!this.ime && key === ' ') {
                    this.at = false;
                    this.setState({ at: false });
                    return;
                }

                // 如果是正在输入中文, 则直接返回, 避免取到拼音字母
                if (this.ime) {
                    return;
                }
                const regexResult = /@([^ ]*)/.exec(this.message.value);
                if (regexResult) {
                    this.setState({ atContent: regexResult[1] });
                }
            }, 100);
        }
    }
    sendTextMessage = () => {
        if (!this.props.connect) {
            return Message.error('发送消息失败, 您当前处于离线状态');
        }

        const message = this.message.value.trim();
        if (message.length === 0) {
            return;
        }

        if (/^invite::/.test(message)) {
            const groupName = message.replace('invite::', '');
            const id = this.addSelfMessage('invite', JSON.stringify({
                inviter: this.props.userName,
                groupId: '',
                groupName,
            }));
            this.sendMessage(id, 'invite', groupName);
        } else {
            const id = this.addSelfMessage('text', xss(message));
            this.sendMessage(id, 'text', message);
        }
        this.message.value = '';
    }
    addSelfMessage = (type, content) => {
        const { userId, userName, userAvatar, focus } = this.props;
        const _id = focus + Date.now();
        const message = {
            _id,
            type,
            content,
            createTime: Date.now(),
            from: {
                _id: userId,
                username: userName,
                avatar: userAvatar,
            },
            loading: true,
        };

        if (type === 'image') {
            message.percent = 0;
        }
        action.addLinkmanMessage(focus, message);

        return _id;
    }
    sendMessage = async (localId, type, content, focus = this.props.focus) => {
        const [err, res] = await fetch('sendMessage', {
            to: focus,
            type,
            content,
        });
        if (err) {
            action.deleteSelfMessage(focus, localId);
        } else {
            res.loading = false;
            action.updateSelfMessage(focus, localId, res);
        }
    }
    handleSelectExpression = (expression) => {
        this.handleVisibleChange(false);
        ChatInput.insertAtCursor(this.message, `#(${expression})`);
    }
    sendImageMessage = (image) => {
        if (image.length > config.maxImageSize) {
            return Message.warning('要发送的图片过大', 3);
        }

        const ext = image.type.split('/').pop().toLowerCase();
        const url = URL.createObjectURL(image.result);

        const img = new Image();
        img.onload = async () => {
            const id = this.addSelfMessage('image', `${url}?width=${img.width}&height=${img.height}`);
            try {
                const { userId, focus } = this.props;
                const imageUrl = await uploadFile(
                    image.result,
                    `ImageMessage/${userId}_${Date.now()}.${ext}`,
                    `ImageMessage_${userId}_${Date.now()}.${ext}`,
                    (info) => {
                        action.updateSelfMessage(focus, id, { percent: info.total.percent });
                    },
                );
                this.sendMessage(id, 'image', `${imageUrl}?width=${img.width}&height=${img.height}`, focus);
            } catch (err) {
                console.error(err);
                Message.error('上传图片失败');
            }
        };
        img.src = url;
    }
    handleSelectFile = async () => {
        if (!this.props.connect) {
            return Message.error('发送消息失败, 您当前处于离线状态');
        }
        const image = await readDiskFile('blob', 'image/png,image/jpeg,image/gif');
        if (!image) {
            return;
        }
        this.sendImageMessage(image);
    }
    sendHuaji = async () => {
        const huaji = getRandomHuaji();
        const id = this.addSelfMessage('image', huaji);
        this.sendMessage(id, 'image', huaji);
    }
    handlePaste = (e) => {
        if (!this.props.connect) {
            e.preventDefault();
            return Message.error('发送消息失败, 您当前处于离线状态');
        }
        const { items, types } = (e.clipboardData || e.originalEvent.clipboardData);

        // 如果包含文件内容
        if (types.indexOf('Files') > -1) {
            for (let index = 0; index < items.length; index++) {
                const item = items[index];
                if (item.kind === 'file') {
                    const file = item.getAsFile();
                    if (file) {
                        const that = this;
                        const reader = new FileReader();
                        reader.onloadend = function () {
                            const image = new Image();
                            image.onload = async () => {
                                const imageBlob = await ChatInput.compressImage(image, file.type, 0.8);
                                that.sendImageMessage({
                                    filename: file.name,
                                    ext: imageBlob.type.split('/').pop(),
                                    length: imageBlob.size,
                                    type: imageBlob.type,
                                    result: imageBlob,
                                });
                            };
                            image.src = this.result;
                        };
                        reader.readAsDataURL(file);
                    }
                }
            }
            e.preventDefault();
        }
    }
    handleIMEStart = () => {
        this.ime = true;
    }
    handleIMEEnd = () => {
        this.ime = false;
    }
    searchExpression = async (keywords) => {
        if (keywords) {
            this.setState({
                expressionSearchLoading: true,
            });
            const [err, result] = await fetch('searchExpression', { keywords });
            if (!err) {
                if (result.length !== 0) {
                    this.setState({
                        expressionSearchResults: result,
                    });
                } else {
                    Message.info('没有相关表情, 换个关键字试试吧');
                }
            }
            this.setState({
                expressionSearchLoading: false,
            });
        }
    }
    handleSearchExpressionButtonClick = () => {
        const keywords = this.expressionSearchKeyword.getValue();
        this.searchExpression(keywords);
    }
    handleSearchExpressionInputEnter = (keywords) => {
        this.searchExpression(keywords);
    }
    handleClickExpression = (e) => {
        const $target = e.target;
        if ($target.tagName === 'IMG') {
            const url = Url.addParam($target.src, {
                width: $target.naturalWidth,
                height: $target.naturalHeight,
            });
            const id = this.addSelfMessage('image', url);
            this.sendMessage(id, 'image', url);
            this.setState({
                expressionSearchVisible: false,
            });
        }
    }
    replaceAt = (username) => {
        this.message.value = this.message.value.replace(`@${this.state.atContent}`, `@${username} `);
        this.setState({
            at: false,
            atContent: '',
        });
        this.message.focus();
    }
    expressionDropdown = (
        <div className="expression-dropdown">
            <Expression onSelect={this.handleSelectExpression} />
        </div>
    )
    featureDropdown = (
        <div className="feature-dropdown">
            <Menu onClick={this.handleFeatureMenuClick}>
                <MenuItem key="expression">发送表情包</MenuItem>
                <MenuItem key="huaji">发送滑稽</MenuItem>
                <MenuItem key="image">发送图片</MenuItem>
                <MenuItem key="code">发送代码</MenuItem>
            </Menu>
        </div>
    )
    render() {
        const { expressionVisible, codeInputVisible, expressionSearchVisible, expressionSearchResults, expressionSearchLoading, at } = this.state;
        const { isLogin } = this.props;

        if (isLogin) {
            return (
                <div className="chat-chatInput">
                    <Dropdown
                        trigger={['click']}
                        visible={expressionVisible}
                        onVisibleChange={this.handleVisibleChange}
                        overlay={this.expressionDropdown}
                        animation="slide-up"
                        placement="topLeft"
                    >
                        <IconButton className="expression" width={44} height={44} icon="expression" iconSize={32} />
                    </Dropdown>
                    <Dropdown
                        trigger={['click']}
                        overlay={this.featureDropdown}
                        animation="slide-up"
                        placement="topLeft"
                    >
                        <IconButton className="feature" width={44} height={44} icon="feature" iconSize={32} />
                    </Dropdown>
                    <input
                        type="text"
                        placeholder="代码会写了吗, 给加薪了吗, 股票涨了吗, 来吐槽一下吧~~"
                        maxLength="2048"
                        autofoucus="true"
                        ref={i => this.message = i}
                        onKeyDown={this.handleInputKeyDown}
                        onPaste={this.handlePaste}
                        onCompositionStart={this.handleIMEStart}
                        onCompositionEnd={this.handleIMEEnd}
                    />
                    <IconButton className="send" width={44} height={44} icon="send" iconSize={32} onClick={this.sendTextMessage} />
                    <Dialog
                        className="codeEditor-dialog"
                        title="请输入要发送的代码"
                        visible={codeInputVisible}
                        onClose={this.handleCodeEditorClose}
                    >
                        <div className="container">
                            <CodeEditor ref={i => this.codeEditor = i} />
                            <button className="codeEditor-button" onClick={this.handleSendCode}>发送</button>
                        </div>
                    </Dialog>
                    <Dialog
                        className="expressionSearch-dialog"
                        title="搜索表情包"
                        visible={expressionSearchVisible}
                        onClose={this.closeExpressionSearch}
                    >
                        <div className="container">
                            <div className="input-container">
                                <Input ref={i => this.expressionSearchKeyword = i} onEnter={this.handleSearchExpressionInputEnter} />
                                <Button onClick={this.handleSearchExpressionButtonClick}>搜索</Button>
                            </div>
                            <div className={`loading ${expressionSearchLoading ? 'show' : 'hide'}`}>
                                <Loading type="spinningBubbles" color="#4A90E2" height={100} width={100} />
                            </div>
                            <div className="expression-list" onClick={this.handleClickExpression}>
                                {
                                    expressionSearchResults.map((image, i) => (
                                        <img src={image} key={i + image} />
                                    ))
                                }
                            </div>
                        </div>
                    </Dialog>
                    <div className="aite-panel">
                        {
                            at ?
                                this.getSuggestion().map((member) => {
                                    const username = member.getIn(['user', 'username']);
                                    return (
                                        <div key={member.getIn(['user', '_id'])} onClick={this.replaceAt.bind(this, username)}>
                                            <Avatar size={24} src={member.getIn(['user', 'avatar'])} />
                                            <p>{username}</p>
                                        </div>
                                    );
                                })
                                :
                                null
                        }
                    </div>
                </div>
            );
        }
        return (
            <div className="chat-chatInput guest">
                <p>游客朋友你好, 请<b onClick={ChatInput.handleLogin}>登录</b>后参与聊天</p>
            </div>
        );
    }
}

export default connect(state => ({
    isLogin: !!state.getIn(['user', '_id']),
    connect: state.get('connect'),
    focus: state.get('focus'),
    userId: state.getIn(['user', '_id']),
    userName: state.getIn(['user', 'username']),
    userAvatar: state.getIn(['user', 'avatar']),
}))(ChatInput);


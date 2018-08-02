import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import * as qiniu from 'qiniu-js';

import action from '@/state/action';
import socket from '@/socket';
import IconButton from '@/components/IconButton';
import Dropdown from '@/components/Dropdown';
import { Menu, MenuItem } from '@/components/Menu';
import Dialog from '@/components/Dialog';
import Message from '@/components/Message';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Loading from '@/components/Loading';

import getRandomHuaji from 'utils/getRandomHuaji';
import readDiskFile from 'utils/readDiskFile';
import fetch from 'utils/fetch';

import Expression from './Expression';
import CodeEditor from './CodeEditor';
import config from '../../../../../config/client';

const xss = require('utils/xss');
const Url = require('utils/url');

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
        user: ImmutablePropTypes.map,
        connect: PropTypes.bool,
    }
    constructor(...args) {
        super(...args);
        this.state = {
            expressionVisible: false,
            codeInputVisible: false,
            expressionSearchVisible: false,
            expressionSearchLoading: false,
            expressionSearchResults: [],
        };
        this.lockEnter = false;
    }
    @autobind
    handleVisibleChange(visible) {
        this.setState({
            expressionVisible: visible,
        });
    }
    @autobind
    handleFeatureMenuClick({ key }) {
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
    @autobind
    handleCodeEditorClose() {
        this.setState({
            codeInputVisible: false,
        });
    }
    @autobind
    closeExpressionSearch() {
        this.setState({
            expressionSearchVisible: false,
        });
    }
    @autobind
    handleSendCode() {
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
        this.handleCodeEditorClose();
    }
    @autobind
    handleInputKeyDown(e) {
        const expressionShortcut = {
            1: '#(阴险)',
            2: '#(乖)',
            3: '#(滑稽)',
            4: '#(呵呵)',
            5: '#(委屈)',
            6: '#(笑眼)',
            7: '#(吐舌)',
            '¡': '#(阴险)',
            '™': '#(乖)',
            '£': '#(滑稽)',
            '¢': '#(呵呵)',
            '∞': '#(委屈)',
            '§': '#(笑眼)',
            '¶': '#(吐舌)',
        };
        if (e.key === 'Tab') {
            e.preventDefault();
        } else if (e.key === 'Enter' && !this.lockEnter) {
            this.sendTextMessage();
        } else if (e.key === 's' || e.key === 'ß') {
            if (e.altKey) {
                this.sendHuaji();
                e.preventDefault();
            }
        } else if (e.key === 'd' || e.key === '∂') {
            if (e.altKey) {
                this.setState({
                    expressionSearchVisible: true,
                });
            }
        } else if (expressionShortcut[e.key]) {
            if (e.altKey) {
                if (!this.props.connect) {
                    return Message.error('发送消息失败, 您当前处于离线状态');
                }
                const id = this.addSelfMessage('text', expressionShortcut[e.key]);
                this.sendMessage(id, 'text', expressionShortcut[e.key]);
                e.preventDefault();
            }
        }
    }
    @autobind
    sendTextMessage() {
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
                inviter: this.props.user.get('username'),
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
    addSelfMessage(type, content) {
        const { user, focus } = this.props;
        const _id = focus + Date.now();
        const message = {
            _id,
            type,
            content,
            createTime: Date.now(),
            from: {
                _id: user.get('_id'),
                username: user.get('username'),
                avatar: user.get('avatar'),
            },
            loading: true,
        };

        if (type === 'image') {
            message.percent = 0;
        }
        action.addLinkmanMessage(focus, message);

        return _id;
    }
    @autobind
    async sendMessage(localId, type, content) {
        const { focus } = this.props;
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
    @autobind
    handleSelectExpression(expression) {
        this.handleVisibleChange(false);
        ChatInput.insertAtCursor(this.message, `#(${expression})`);
    }
    sendImageMessage(image) {
        if (image.length > config.maxImageSize) {
            return Message.warning('要发送的图片过大', 3);
        }

        const { user, focus } = this.props;
        const ext = image.type.split('/').pop().toLowerCase();
        const url = URL.createObjectURL(image.result);

        const img = new Image();
        img.onload = () => {
            const id = this.addSelfMessage('image', `${url}?width=${img.width}&height=${img.height}`);
            socket.emit('uploadToken', {}, (res) => {
                if (typeof res === 'string') {
                    Message.error(res);
                } else {
                    const result = qiniu.upload(image.result, `ImageMessage/${user.get('_id')}_${Date.now()}.${ext}`, res.token, { useCdnDomain: true }, {});
                    result.subscribe({
                        next(info) {
                            action.updateSelfMessage(focus, id, { percent: info.total.percent });
                        },
                        error(err) {
                            console.error(err);
                            Message.error('上传图片失败');
                        },
                        complete: (info) => {
                            const imageUrl = `${res.urlPrefix + info.key}?width=${img.width}&height=${img.height}`;
                            this.sendMessage(id, 'image', imageUrl);
                        },
                    });
                }
            });
        };
        img.src = url;
    }
    @autobind
    async handleSelectFile() {
        if (!this.props.connect) {
            return Message.error('发送消息失败, 您当前处于离线状态');
        }
        const image = await readDiskFile('blob', 'image/png,image/jpeg,image/gif');
        if (!image) {
            return;
        }
        this.sendImageMessage(image);
    }
    @autobind
    async sendHuaji() {
        const huaji = getRandomHuaji();
        const id = this.addSelfMessage('image', huaji);
        this.sendMessage(id, 'image', huaji);
    }
    @autobind
    handlePaste(e) {
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
    @autobind
    handleIMEStart() {
        this.lockEnter = true;
    }
    @autobind
    handleIMEEnd() {
        this.lockEnter = false;
    }
    async searchExpression(keywords) {
        if (keywords) {
            this.setState({
                expressionSearchLoading: true,
            });
            const [err, result] = await fetch('searchExpression', { keywords });
            if (!err) {
                this.setState({
                    expressionSearchResults: result,
                });
            }
            this.setState({
                expressionSearchLoading: false,
            });
        }
    }
    @autobind
    handleSearchExpressionButtonClick() {
        const keywords = this.expressionSearchKeyword.getValue();
        this.searchExpression(keywords);
    }
    @autobind
    handleSearchExpressionInputEnter(keywords) {
        this.searchExpression(keywords);
    }
    @autobind
    handleClickExpression(e) {
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
        const { expressionVisible, codeInputVisible, expressionSearchVisible, expressionSearchResults, expressionSearchLoading } = this.state;
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
                    <input
                        type="text"
                        placeholder="代码会写了吗, 给加薪了吗, 股票涨了吗, 来吐槽一下吧~~"
                        maxLength="2048"
                        ref={i => this.message = i}
                        onKeyDown={this.handleInputKeyDown}
                        onPaste={this.handlePaste}
                        onCompositionStart={this.handleIMEStart}
                        onCompositionEnd={this.handleIMEEnd}
                    />
                    <IconButton className="send" width={44} height={44} icon="send" iconSize={32} onClick={this.sendTextMessage} />
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
    user: state.get('user'),
}))(ChatInput);


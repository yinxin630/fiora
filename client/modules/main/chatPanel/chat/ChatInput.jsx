import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import action from '@/state/action';
import socket from '@/socket';
import IconButton from '@/components/IconButton';
import Dropdown from '@/components/Dropdown';
import { Menu, MenuItem } from '@/components/Menu';
import Dialog from '@/components/Dialog';
import Message from '@/components/Message';
import Expression from './Expression';
import CodeEditor from './CodeEditor';

class ChatInput extends Component {
    static propTypes = {
        isLogin: PropTypes.bool.isRequired,
        groupId: PropTypes.string,
        user: ImmutablePropTypes.map,
    }
    static handleLogin() {
        action.showLoginDialog();
    }
    constructor(...args) {
        super(...args);
        this.state = {
            expressionVisible: false,
            codeInputVisible: false,
        };
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
        case 'code': {
            this.setState({
                codeInputVisible: true,
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
    handleSendCode() {
        console.log('发送代码', this.codeEditor.getValue());
        this.handleCodeEditorClose();
    }
    @autobind
    handleInputKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            this.sendTextMessage();
        }
    }
    @autobind
    sendTextMessage() {
        const message = this.message.value;
        this.sendMessage('text', message);
        this.message.value = '';
    }
    @autobind
    sendMessage(type, content) {
        const { user, groupId: toGroup } = this.props;
        const _id = toGroup + Date.now();
        console.log(user);
        action.addGroupMessage(toGroup, {
            _id,
            type,
            content,
            createTime: Date.now(),
            from: {
                _id: user.get('_id'),
                username: user.get('username'),
                avatar: user.get('avatar'),
            },
        });
        socket.emit('sendMessage', {
            toGroup,
            type,
            content,
        }, (res) => {
            if (typeof res === 'string') {
                Message.error(res);
            } else {
                console.log(res);
            }
        });
    }
    expressionDropdown = (
        <div className="expression-dropdown">
            <Expression />
        </div>
    )
    featureDropdown = (
        <div className="feature-dropdown">
            <Menu onClick={this.handleFeatureMenuClick}>
                <MenuItem key="image">发送图片</MenuItem>
                <MenuItem key="code">发送代码</MenuItem>
            </Menu>
        </div>
    )
    render() {
        const { expressionVisible, codeInputVisible } = this.state;
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
                        title="请输入要发送的代码"
                        visible={codeInputVisible}
                        onClose={this.handleCodeEditorClose}
                    >
                        <div className="codeEditor-dialog">
                            <CodeEditor ref={i => this.codeEditor = i} />
                            <button className="codeEditor-button" onClick={this.handleSendCode}>发送</button>
                        </div>
                    </Dialog>
                    <input placeholder="代码会写了吗, 给加薪了吗, 股票涨了吗, 来吐槽一下吧~~" ref={i => this.message = i} onKeyDown={this.handleInputKeyDown} />
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
    groupId: state.get('focusGroup'),
    user: state.get('user'),
}))(ChatInput);

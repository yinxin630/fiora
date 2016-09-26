import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import './inputBox.scss';

import ui from '../../../action/pc';
import user from '../../../action/user';
import api from '../../../api';
import config from '../../../../../config/config';

class InputBox extends React.Component {
    static propTypes = {
        linkmanId: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        insertTexts: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
        this.handlePaste = this.handlePaste.bind(this);
    }

    componentWillUpdate(nextProps) {
        if (!nextProps.insertTexts.equals(this.props.insertTexts)) {
            nextProps.insertTexts.forEach(text => {
                this.insertAtCursor(this.input, text);
            });
            ui.insertTextEnd(nextProps.insertTexts.size);
        }
    }

    insertAtCursor(input, value) {
        if (document.selection) {
            input.focus();
            const sel = document.selection.createRange();
            sel.text = value;
            sel.select();
        }
        else if (input.selectionStart || input.selectionStart === '0') {
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

    handleInputKeyDown(e) {
        const { type, linkmanId } = this.props;
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();

            const message = this.input.value;
            this.input.value = '';
            if (message.trim() === '') {
                return;
            }
            if (type === 'group') {
                if (/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(message)) {
                    const img = new Image();
                    img.onload = () => {
                        user.sendGroupMessage(linkmanId, 'image', message);
                    };
                    img.onerror = () => {
                        user.sendGroupMessage(linkmanId, 'url', message);
                    };
                    img.src = message;
                    return;
                }
                user.sendGroupMessage(linkmanId, 'text', message);
            }
            else {
                if (/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(message)) {
                    const img = new Image();
                    img.onload = () => {
                        user.sendMessage(linkmanId, 'image', message);
                    };
                    img.onerror = () => {
                        user.sendMessage(linkmanId, 'url', message);
                    };
                    img.src = message;
                    return;
                }
                user.sendMessage(linkmanId, 'text', message).then(response => {
                    if (response.status === 201) {
                        api.emit('rawMessage', response.data);
                    }
                });
            }
        }
    }

    handlePaste(e) {
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        const types = (e.clipboardData || e.originalEvent.clipboardData).types;

        // 如果包含文件内容
        if (types.indexOf('Files') > -1) {
            for (let index = 0; index < items.length; index++) {
                const item = items[index];
                if (item.kind === 'file' && item.type.match(/^image/)) {
                    const reader = new FileReader();
                    const instance = this;
                    reader.onloadend = function () {
                        if (instance.props.type === 'group') {
                            user.sendGroupMessage(instance.props.linkmanId, 'image', this.result);
                        }
                        else {
                            user.sendMessage(instance.props.linkmanId, 'image', this.result);
                        }
                    };
                    reader.readAsDataURL(item.getAsFile());
                }
            }
            e.preventDefault();
        }
    }

    render() {
        return (
            <div
                className="input-box"
            >
                <input
                    type="text"
                    ref={input => this.input = input}
                    placeholder="输入消息"
                    maxLength={config.maxMessageLength}
                    onKeyDown={this.handleInputKeyDown}
                    onPaste={this.handlePaste}
                />
            </div>
        );
    }
}

export default connect(
    state => ({
        insertTexts: state.getIn(['ui', 'insertTexts']),
    })
)(InputBox);

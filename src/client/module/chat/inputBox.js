import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';
import { Motion, spring } from 'react-motion';
import { connect } from 'react-redux';

import './style/inputBox.scss';

import ui from '../../action/ui';
import user from '../../action/user';
import config from '../../../../config/config';

class InputBox extends React.Component {
    static propTypes = {
        linkmanId: PropTypes.string.isRequired,
        show: PropTypes.bool.isRequired,
        type: PropTypes.string.isRequired,
        insertTexts: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
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
            if (type === 'group') {
                if (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(message)) {
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
        }
    }

    render() {
        const { show } = this.props;
        return (
            <Motion
                defaultStyle={{ marginTop: 5 }}
                style={{ marginTop: spring(show ? 40 : 5) }}
            >
            {
                style => (
                    <div
                        className="input-box"
                        style={style}
                    >
                        <input
                            type="text"
                            ref={input => this.input = input}
                            placeholder="输入消息"
                            maxLength={config.maxMessageLength}
                            onFocus={ui.openToolbar}
                            onBlur={ui.closeToolbar}
                            onClick={ui.openToolbar}
                            onKeyDown={this.handleInputKeyDown}
                        />
                    </div>
                )
            }
            </Motion>
        );
    }
}

export default connect(
    state => ({
        show: state.getIn(['ui', 'showToolbar']),
        insertTexts: state.getIn(['ui', 'insertTexts']),
    })
)(InputBox);

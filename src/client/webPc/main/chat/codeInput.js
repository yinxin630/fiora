import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import pureRenderMixin from 'react-addons-pure-render-mixin';
import { Motion, spring } from 'react-motion';

import './codeInput.scss';

import ui from '../../../action/pc';
import user from '../../../action/user';


class CodeInput extends React.Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
        linkmanId: PropTypes.string.isRequired,
        linkmanType: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.onSendClick = this.onSendClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
    }

    onSendClick() {
        if (this.props.linkmanType === 'group') {
            user.sendGroupMessage(this.props.linkmanId, 'code', this.code.value);
        }
        else {
            user.sendMessage(this.props.linkmanId, 'code', this.code.value);
        }
        this.code.value = '';
        ui.closeCodeInput();
        ui.closeMaskLayout();
    }

    onCancelClick() {
        ui.closeCodeInput();
        ui.closeMaskLayout();
    }

    render() {
        const { show } = this.props;
        return (
            <Motion
                defaultStyle={{ scale: 0.4, opacity: 0 }}
                style={{ scale: spring(show ? 1 : 0.4), opacity: spring(show ? 1 : 0) }}
            >
            {
                ({ scale, opacity }) => (
                    <div
                        className="code-input"
                        style={{ opacity, transform: `scale(${scale})`, display: opacity === 0 ? 'none' : 'flex' }}
                    >
                        <textarea
                            ref={code => this.code = code}
                            placeholder="输入要发送的代码"
                        />
                        <div>
                            <button
                                onClick={this.onSendClick}
                            >
                                发送
                            </button>
                            <button
                                onClick={this.onCancelClick}
                            >
                                取消
                            </button>
                        </div>
                    </div>
                )
            }
            </Motion>
        );
    }
}

export default connect(
    state => ({
        show: state.getIn(['pc', 'showCodeInput']),
    })
)(CodeInput);

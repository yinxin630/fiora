import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';
import { Motion, spring } from 'react-motion';
import { connect } from 'react-redux';

import './style/inputBox.scss';

import ui from '../../action/ui';
import user from '../../action/user';

class InputBox extends React.Component {
    static propTypes = {
        linkmanId: PropTypes.string.isRequired,
        show: PropTypes.bool.isRequired,
        type: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    }

    handleInputKeyDown(e) {
        const { type, linkmanId } = this.props;
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();

            const message = this.input.value;
            this.input.value = '';
            if (type === 'group') {
                user.sendGroupMessage(linkmanId, message);
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
                            onFocus={ui.openToolbar}
                            onBlur={ui.closeToolbar}
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
    })
)(InputBox);

import React from 'react';
import './style/inputBox.scss';

import { Motion, spring } from 'react-motion';
import { connect } from 'react-redux'
import ui from '../../action/ui';
import user from '../../action/user';

class InputBox extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    }

    handleInputKeyDown(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            
            let message = this.input.value;
            this.input.value = '';
            user.sendGroupMessage(this.props.linkmanId, message);
        }
    }

    render () {
        let { show, type, linkmanId } = this.props;
        return (
            <Motion 
                defaultStyle={{ marginTop: 5 }}
                style={{ marginTop: spring(show ? 40 : 5) }}
            >
            {
                style => (
                    <div 
                        className="input-box"
                        style={ style }
                    >
                        <input 
                            type="text" 
                            ref={input => this.input = input}
                            onFocus={ ui.openToolbar }
                            onBlur={ ui.closeToolbar }
                            onKeyDown={ this.handleInputKeyDown }
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
        show: state.ui.showToolbar,
    })
)(InputBox);
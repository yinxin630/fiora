import React from 'react';
import '../style/inputBox.scss';

import { Motion, spring } from 'react-motion';
import { connect } from 'react-redux'
import ui from '../action/ui';

class InputBox extends React.Component {
    render () {
        let { show } = this.props;
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
                            onFocus={ this.props.showToolbar }
                            onBlur={ this.props.closeToolbar }
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
    }),
    () => ({
        showToolbar: ui.showToolbar,
        closeToolbar: ui.closeToolbar,
    })
)(InputBox);
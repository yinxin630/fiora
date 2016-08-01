import React from 'react';
import '../style/inputBox.scss';

import { connect } from 'react-redux'
import ui from '../action/ui';

class InputBox extends React.Component {
    render () {
        return (
            <div className="input-box">
                <input 
                    type="text" 
                    onFocus={ this.props.showToolbar }
                    onBlur={ this.props.closeToolbar }
                />
            </div>
        );
    }
}

export default connect(
    () => ({}),
    () => ({
        showToolbar: ui.showToolbar,
        closeToolbar: ui.closeToolbar,
    })
)(InputBox);
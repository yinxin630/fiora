import React from 'react';
import '../style/inputBox.scss';

class InputBox extends React.Component {
    render () {
        return (
            <div className="input-box">
                <input type="text" autofocus/>
            </div>
        );
    }
}

export default InputBox;
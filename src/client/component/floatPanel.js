import React from 'react';
import '../style/floatPanel.scss';

class FloatPanel extends React.Component {
    render () {
        return (
            <div className="float-panel">
                <div>
                    <span>群设置</span>
                    <i className="icon">&#xe603;</i>
                </div>
                { this.props.children }
            </div>
        );
    }
}

export default FloatPanel;
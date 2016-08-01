import React from 'react';
import '../style/floatPanel.scss';

import { Motion, spring } from 'react-motion';

class FloatPanel extends React.Component {
    constructor (props) {
        super(props);
        this.renderFloatPanel = this.renderFloatPanel.bind(this);
    }

    render () {
        let { show } = this.props;
        return show ? this.renderFloatPanel() : null;
    }

    renderFloatPanel () {
        let { show } = this.props;
        return (
            <Motion 
                defaultStyle={{ right: -325 }}
                style={{ right: spring(show ? 0 : -325) }}
            >
            {
                style => (
                    <div className="float-panel" style={ style }>
                        <div>
                            <span>群设置</span>
                            <i className="icon" onClick={ this.props.onClose }>&#xe603;</i>
                        </div>
                        { this.props.children }
                    </div>
                )
            }
            </Motion>
        );
    }
}

export default FloatPanel;
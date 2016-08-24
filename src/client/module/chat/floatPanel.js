import React from 'react';
import './style/floatPanel.scss';

import { Motion, spring } from 'react-motion';
import ui from '../../action/ui';

class FloatPanel extends React.Component {
    constructor (props) {
        super(props);
        this.handleCloseClick = this.handleCloseClick.bind(this);
    }

    render () {
        let { show, title } = this.props;
        return (
            <Motion 
                defaultStyle={{ right: -340 }}
                style={{ right: spring(show ? 0 : -340) }}
            >
            {
                style => (
                    <div className="float-panel" style={ style }>
                        <div>
                            <span>{ title }</span>
                            <i className="icon" onClick={ this.handleCloseClick }>&#xe603;</i>
                        </div>
                        { this.props.children }
                    </div>
                )
            }
            </Motion>
        );
    }

    handleCloseClick () {
        this.props.onClose();
        ui.closeMaskLayout();
    }
}

export default FloatPanel;
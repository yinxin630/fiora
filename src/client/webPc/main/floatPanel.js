import React, { PropTypes } from 'react';
import { Motion, spring } from 'react-motion';

import './floatPanel.scss';

import ui from '../../action/pc';

class FloatPanel extends React.Component {
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        show: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        children: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.handleCloseClick = this.handleCloseClick.bind(this);
    }

    handleCloseClick() {
        this.props.onClose();
        ui.closeMaskLayout();
    }

    render() {
        const { show, title } = this.props;
        return (
            <Motion
                defaultStyle={{ right: -340 }}
                style={{ right: spring(show ? 0 : -340) }}
            >
            {
                style => (
                    <div className="float-panel" style={style}>
                        <div>
                            <span>{ title }</span>
                            <i className="icon" onClick={this.handleCloseClick}>&#xe603;</i>
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

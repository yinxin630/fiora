import React from 'react';
import '../style/toolbar.scss';

import ui from '../action/ui';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import once from 'once-event-listener';

class Toolbar extends React.Component {
    constructor (props) {
        super(props);
        this.renderToolbar = this.renderToolbar.bind(this);
        this.onExpressionClick = this.onExpressionClick.bind(this);
    }

    render () {
        let { show } = this.props;
        return this.renderToolbar();
    }
    
    renderToolbar () {
        let { show } = this.props;
        return (
            <Motion 
                defaultStyle={{ bottom: -5, opacity: 0 }}
                style={{ bottom: spring(show ? 30 : -5), opacity: spring(show ? 1 : 0) }}
            >
            {
                style => (
                    <div 
                        className="toolbar"
                        style={ style }
                    >
                        <div>
                            <i  className="icon"
                                onClick={ this.onExpressionClick }
                            >&#xe604;</i>
                        </div>
                        <div>
                            <i className="icon">&#xe605;</i>
                        </div>
                        <div>
                            <i className="icon">&#xe602;</i>
                        </div>
                    </div>
                )
            }
            </Motion>
        );
    }

    onExpressionClick () {
        ui.openExpression();
        ui.openMaskLayout();
        once(document.querySelector('#maskLayout'), 'click', () => {
            ui.closeExpression();
            ui.closeMaskLayout();
        });
    }
}

export default connect(
    state => ({
        show: state.ui.showToolbar,
    })
)(Toolbar);
import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';

import './style/toolbar.scss';

import ui from '../../action/ui';
import mask from '../../util/mask';

class Toolbar extends React.Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.renderToolbar = this.renderToolbar.bind(this);
        this.onExpressionClick = this.onExpressionClick.bind(this);
    }

    onExpressionClick() {
        ui.openExpression();
        mask(ui.closeExpression);
    }

    renderToolbar() {
        const { show } = this.props;
        return (
            <Motion
                defaultStyle={{ bottom: 0, opacity: 0 }}
                style={{ bottom: spring(show ? 30 : 0), opacity: spring(show ? 1 : 0) }}
            >
            {
                ({ bottom, opacity }) => (
                    <div
                        className="toolbar"
                        style={{ bottom, opacity, display: opacity === 0 ? 'none' : 'flex' }}
                    >
                        <div>
                            <i
                                className="icon"
                                onClick={this.onExpressionClick}
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

    render() {
        return this.renderToolbar();
    }
}

export default connect(
    state => ({
        show: state.getIn(['ui', 'showToolbar']),
    })
)(Toolbar);

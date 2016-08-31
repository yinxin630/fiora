import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';

import './style/expression.scss';

import ui from '../../action/ui';
import expressions from '../../util/expressions';

// this is just for test code
const collectExpressionExample = [
    'http://7xrutd.com1.z0.glb.clouddn.com/message_1470115329646?v=1470115329772',
    'http://7xrutd.com1.z0.glb.clouddn.com/message_1470114833324?v=1470114833419',
    'http://7xrutd.com1.z0.glb.clouddn.com/avatar_5717231b9eb6ce193a9a7806?v=1469758686352',
    'http://7xrutd.com1.z0.glb.clouddn.com/message_1470114592770?v=1470114592943',
    'http://7xrutd.com1.z0.glb.clouddn.com/avatar_56f0c64f696c9deb176d770b?v=1463118961270',
    'http://7xrutd.com1.z0.glb.clouddn.com/message_1470115329646?v=1470115329772',
    'http://7xrutd.com1.z0.glb.clouddn.com/message_1470114833324?v=1470114833419',
    'http://7xrutd.com1.z0.glb.clouddn.com/avatar_5717231b9eb6ce193a9a7806?v=1469758686352',
    'http://7xrutd.com1.z0.glb.clouddn.com/message_1470114592770?v=1470114592943',
    'http://7xrutd.com1.z0.glb.clouddn.com/avatar_56f0c64f696c9deb176d770b?v=1463118961270',
];

class Expression extends React.Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = { page: 'default' };
        this.renderDefaultExpression = this.renderDefaultExpression.bind(this);
        this.renderCollectExpression = this.renderCollectExpression.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(value) {
        ui.insertText(`#(${value})`);
        ui.closeExpression();
        ui.closeMaskLayout();
    }

    renderDefaultExpression() {
        return (
            <div className="default-expression">
            {
                expressions.map((e, index) => (
                    <div
                        key={index}
                        onClick={() => this.handleClick(e)}
                    >
                        <div style={{ backgroundPosition: `left ${-30 * index}px` }} />
                    </div>
                ))
            }
            </div>
        );
    }

    renderCollectExpression() {
        return (
            <div className="collect-expression">
            {
                collectExpressionExample.map((e, index) => (
                    <div key={index}>
                        <div style={{ backgroundImage: `url(${e})` }} />
                    </div>
                ))
            }
            </div>
        );
    }

    render() {
        const { page } = this.state;
        const { show } = this.props;
        return (
            <Motion
                defaultStyle={{ scale: 0.4, opacity: 0 }}
                style={{ scale: spring(show ? 1 : 0.4), opacity: spring(show ? 1 : 0) }}
            >
            {
                ({ scale, opacity }) => (
                    <div
                        className="expression"
                        style={{ opacity, transform: `scale(${scale})`, display: opacity === 0 ? 'none' : 'block' }}
                    >
                        { page === 'default' ? this.renderDefaultExpression() : this.renderCollectExpression() }
                        <div>
                            <div
                                className={page === 'default' ? 'selected' : ''}
                                onClick={() => this.setState({ page: 'default' })}
                            >
                                <img src={require('../../image/default-expression.png')} />
                            </div>
                            <div
                                className={page === 'collect' ? 'selected' : ''}
                                onClick={() => this.setState({ page: 'collect' })}
                            >
                                <img src={require('../../image/collect-expression.png')} />
                            </div>
                        </div>
                    </div>
                )
            }
            </Motion>
        );
    }
}

export default connect(
    state => ({
        show: state.getIn(['ui', 'showExpression']),
    })
)(Expression);

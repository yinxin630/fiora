import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';

import './expression.scss';

import ui from '../../../action/ui';
import user from '../../../action/user';
import expressions from '../../../util/expressions';


class Expression extends React.Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
        userExpressions: PropTypes.object,
        linkmanType: PropTypes.string.isRequired,
        linkmanId: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = { page: 'default' };
        this.renderDefaultExpression = this.renderDefaultExpression.bind(this);
        this.renderCollectExpression = this.renderCollectExpression.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCollectExpressionClick = this.handleCollectExpressionClick.bind(this);
        this.handleCollectExpressionDelete = this.handleCollectExpressionDelete.bind(this);
    }

    handleClick(value) {
        ui.insertText(`#(${value})`);
        ui.closeExpression();
        ui.closeMaskLayout();
    }

    handleCollectExpressionClick(src) {
        const { linkmanType, linkmanId } = this.props;
        if (linkmanType === 'group') {
            user.sendGroupMessage(linkmanId, 'image', src);
            ui.closeExpression();
            ui.closeMaskLayout();
        }
        else {
            user.sendMessage(linkmanId, 'image', src);
            ui.closeExpression();
            ui.closeMaskLayout();
        }
    }

    handleCollectExpressionDelete(src) {
        user.deleteUserExpression(src);
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
        const { userExpressions } = this.props;

        return (
            <div className="collect-expression">
            {
                userExpressions.map((e, index) => (
                    <div key={index}>
                        <i
                            className="icon"
                            onClick={() => this.handleCollectExpressionDelete(e)}
                        >&#xe603;</i>
                        <div
                            style={{ backgroundImage: `url(${e})` }}
                            onClick={() => this.handleCollectExpressionClick(e)}
                        />
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
                                <img src={'http://od8dycy67.bkt.clouddn.com/default-expression.png'} />
                            </div>
                            <div
                                className={page === 'collect' ? 'selected' : ''}
                                onClick={() => this.setState({ page: 'collect' })}
                            >
                                <img src={'http://od8dycy67.bkt.clouddn.com/collect-expression.png'} />
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
        userExpressions: state.getIn(['user', 'expressions']),
    })
)(Expression);

import React from 'react';
import './style/expression.scss';

import pureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';

const expressions = ['呵呵', '哈哈', '吐舌', '啊', '酷', '怒', '开心', '汗', '泪', '黑线',
                     '鄙视', '不高兴', '真棒', '钱', '疑问', '阴险', '吐', '咦', '委屈', '花心', 
                     '呼', '笑眼', '冷', '太开心', '滑稽', '勉强', '狂汗', '乖', '睡觉', '惊哭',
                     '升起', '惊讶', '喷', '爱心', '心碎', '玫瑰', '礼物', '彩虹', '星星月亮', '太阳',
                     '钱币', '灯泡', '咖啡', '蛋糕', '音乐', 'haha', '胜利', '大拇指', '弱', 'ok'];

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
    constructor (props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = { page: 'default' };
        this.renderDefaultExpression = this.renderDefaultExpression.bind(this);
        this.renderCollectExpression = this.renderCollectExpression.bind(this);
    }

    render () {
        let { page } = this.state;
        let { show } = this.props;
        return (
            <Motion 
                defaultStyle={{ scale: 0.4, opacity: 0 }}
                style={{ scale :spring(show ? 1 : 0.4), opacity: spring(show ? 1 : 0) }}
            >
            {
                ({ scale, opacity }) => (
                    <div 
                        className="expression" 
                        style={{ opacity: opacity, transform: `scale(${ scale })` }}
                    >
                        { page === 'default' ? this.renderDefaultExpression() : this.renderCollectExpression() }
                        <div>
                            <div 
                                className={ page === 'default' ? 'selected' : '' }
                                onClick={ () => this.setState({ page: 'default' }) }
                            >
                                <img src={ require('../../image/default-expression.png') }/>
                            </div>
                            <div 
                                className={ page === 'collect' ? 'selected' : '' }
                                onClick={ () => this.setState({ page: 'collect' }) }
                            >
                                <img src={ require('../../image/collect-expression.png') }/>
                            </div>
                        </div>
                    </div>
                )
            }
            </Motion>
        );
    }

    renderDefaultExpression () {
        return (
            <div className="default-expression">
            {
                expressions.map((e, index) => {
                    return (
                        <div key={ index } >
                            <div style={{ backgroundPosition: `left ${-30 * index}px` }}/>
                        </div>
                    );
                })
            }
            </div>
        );
    }

    renderCollectExpression () {
        return (
            <div className="collect-expression">
            {
                collectExpressionExample.map((e, index) => (
                    <div key={ index }>
                        <div style={{ backgroundImage: `url(${e})` }}/>
                    </div>
                ))
            }
            </div>
        );
    }
}

export default connect(
    state => ({
        show: state.getIn(['ui', 'showExpression'])
    })
)(Expression);
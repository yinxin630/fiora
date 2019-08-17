import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Tabs, TabPane, TabContent, ScrollableInkTabBar,
} from '../../../../components/Tabs';
import expressions from '../../../../../utils/expressions';
import baidu from '../../../../assets/images/baidu.png';

class Expression extends Component {
    static propTypes = {
        onSelect: PropTypes.func,
    }

    static defaultProps = {
        onSelect: () => {},
    }

    handleClick = (e) => {
        const { name } = e.currentTarget.dataset;
        const { onSelect } = this.props;
        if (onSelect) {
            onSelect(name);
        }
    }

    renderDefaultExpression = () => (
        <div className="default-expression">
            {
                expressions.default.map((e, index) => (
                    <div
                        key={e}
                        data-name={e}
                        onClick={this.handleClick}
                        role="button"
                    >
                        <div className="image" style={{ backgroundPosition: `left ${-30 * index}px`, backgroundImage: `url(${baidu})` }} />
                    </div>
                ))
            }
        </div>
    )

    render() {
        return (
            <div className="chat-expression">
                <Tabs
                    defaultActiveKey="default"
                    renderTabBar={() => <ScrollableInkTabBar />}
                    renderTabContent={() => <TabContent />}
                >
                    <TabPane tab="默认表情" key="default">
                        {this.renderDefaultExpression()}
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Expression;

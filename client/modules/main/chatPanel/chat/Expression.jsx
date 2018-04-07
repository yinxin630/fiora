import React, { Component } from 'react';

import { Tabs, TabPane, TabContent, ScrollableInkTabBar } from '@/components/Tabs';
import expressions from '../../../../../utils/expressions';


class Expression extends Component {
    renderDefaultExpression = () => (
        <div className="default-expression">
            {
                expressions.default.map((e, index) => (
                    <div
                        key={index}
                        data-name={e}
                        onClick={this.handleClick}
                    >
                        <div className="no-click" style={{ backgroundPosition: `left ${-30 * index}px`, backgroundImage: `url(${require('@/assets/images/expressions.png')})` }} />
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

import React from 'react';

import {
    Tabs, TabPane, TabContent, ScrollableInkTabBar,
} from '../../components/Tabs';
import expressions from '../../../utils/expressions';

interface ExpressionProps {
    onSelect: (expression: string) => void
}

function Expression(props: ExpressionProps) {
    const { onSelect } = props;
    const defaultExpression = (
        <div className="default-expression">
            {
                expressions.default.map((e, index) => (
                    <div
                        key={e}
                        data-name={e}
                        onClick={(event) => onSelect(event.currentTarget.dataset.name)}
                        role="button"
                    >
                        <div className="image" style={{ backgroundPosition: `left ${-30 * index}px`, backgroundImage: `url(${require('../../assets/images/baidu.png')})` }} />
                    </div>
                ))
            }
        </div>
    );

    return (
        <div className="chat-expression">
            <Tabs
                defaultActiveKey="default"
                renderTabBar={() => <ScrollableInkTabBar />}
                renderTabContent={() => <TabContent />}
            >
                <TabPane tab="默认表情" key="default">
                    {defaultExpression}
                </TabPane>
            </Tabs>
        </div>
    );
}

export default Expression;

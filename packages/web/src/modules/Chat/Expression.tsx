import React, { useState } from 'react';
import Loading from 'react-loading';

import expressions from '@fiora/utils/expressions';
import { addParam } from '@fiora/utils/url';
import BaiduImage from '@fiora/assets/images/baidu.png';
import Style from './Expression.less';
import {
    Tabs,
    TabPane,
    TabContent,
    ScrollableInkTabBar,
} from '../../components/Tabs';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { searchExpression } from '../../service';
import Message from '../../components/Message';

interface ExpressionProps {
    onSelectText: (expression: string) => void;
    onSelectImage: (expression: string) => void;
}

function Expression(props: ExpressionProps) {
    const { onSelectText, onSelectImage } = props;

    const [keywords, setKeywords] = useState('');
    const [searchLoading, toggleSearchLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    async function handleSearchExpression() {
        if (keywords) {
            toggleSearchLoading(true);
            setSearchResults([]);
            const result = await searchExpression(keywords);
            if (result) {
                if (result.length !== 0) {
                    setSearchResults(result);
                } else {
                    Message.info('没有相关表情, 换个关键字试试吧');
                }
            }
            toggleSearchLoading(false);
        }
    }

    const renderDefaultExpression = (
        <div className={Style.defaultExpression}>
            {expressions.default.map((e, index) => (
                <div
                    className={Style.defaultExpressionBlock}
                    key={e}
                    data-name={e}
                    onClick={(event) =>
                        onSelectText(event.currentTarget.dataset.name as string)
                    }
                    role="button"
                >
                    <div
                        className={Style.defaultExpressionItem}
                        style={{
                            backgroundPosition: `left ${-30 * index}px`,
                            backgroundImage: `url(${BaiduImage})`,
                        }}
                    />
                </div>
            ))}
        </div>
    );

    function handleClickExpression(e: any) {
        const $target = e.target;
        const url = addParam($target.src, {
            width: $target.naturalWidth,
            height: $target.naturalHeight,
        });
        onSelectImage(url);
    }

    const renderSearchExpression = (
        <div className={Style.searchExpression}>
            <div className={Style.searchExpressionInputBlock}>
                <Input
                    className={Style.searchExpressionInput}
                    value={keywords}
                    onChange={setKeywords}
                    onEnter={handleSearchExpression}
                />
                <Button
                    className={Style.searchExpressionButton}
                    onClick={handleSearchExpression}
                >
                    搜索
                </Button>
            </div>
            <div
                className={`${Style.loading} ${
                    searchLoading ? 'show' : 'hide'
                }`}
            >
                <Loading
                    type="spinningBubbles"
                    color="#4A90E2"
                    height={100}
                    width={100}
                />
            </div>
            <div className={Style.searchResult}>
                {searchResults.map(({ image }) => (
                    <div className={Style.searchImage}>
                        <img
                            src={image}
                            alt="表情"
                            key={image}
                            onClick={handleClickExpression}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className={Style.expression}>
            <Tabs
                defaultActiveKey="default"
                renderTabBar={() => <ScrollableInkTabBar />}
                renderTabContent={() => <TabContent />}
            >
                <TabPane tab="默认表情" key="default">
                    {renderDefaultExpression}
                </TabPane>
                <TabPane tab="搜索表情包" key="search">
                    {renderSearchExpression}
                </TabPane>
            </Tabs>
        </div>
    );
}

export default Expression;

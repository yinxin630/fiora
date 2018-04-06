import React, { Component } from 'react';

import LinkmanGroup from './LinkmanGroup';
import Linkman from './Linkman';
import './FeatureLinkmans.less';

class FeatureLinkmans extends Component {
    render() {
        return (
            <div className="module-main-feature">
                <LinkmanGroup defaultFocus="1">
                    <Linkman
                        key="1"
                        name="小姐姐一号"
                        avatar={require('@/assets/images/头像2.png')}
                        preview="1111111111#(乖)"
                        time={new Date()}
                        unread={9}
                    />
                    <Linkman
                        key="2"
                        name="小姐姐二号"
                        avatar={require('@/assets/images/头像2.png')}
                        preview="发尽快落实到解放路可是对方荆防颗粒世纪东方法术打击发送"
                        time={new Date(2017, 11, 23)}
                        unread={99}
                    />
                    <Linkman
                        key="3"
                        name="fiora"
                        avatar={require('@/assets/images/头像2.png')}
                        preview="1111111111#(乖)"
                        time={new Date(2018, 2, 24)}
                        unread={0}
                    />
                </LinkmanGroup>
            </div>
        );
    }
}

export default FeatureLinkmans;

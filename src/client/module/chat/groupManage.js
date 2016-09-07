import React from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './style/groupManage.scss';

class GroupManage extends React.Component {
    static propTypes = {

    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div className="group-manage">
                <div>创建群组</div>
                <div>加入群组</div>
            </div>
        );
    }
}

export default GroupManage;

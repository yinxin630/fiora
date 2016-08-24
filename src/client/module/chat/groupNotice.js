import React from 'react';
import './style/groupNotice.scss';

import { connect } from 'react-redux';
import ui from '../../action/ui';
import FloatPanel from './floatPanel';

class GroupNotice extends React.Component {
    render () {
        let { show } = this.props;
        return (
            <FloatPanel 
                onClose={ ui.closeGroupNotice } 
                show={ show }
                title="群公告"
            >
                <div className="group-notice">
                    <div>碎碎酱 更新于 11月11日 11:11</div>
                    <div className="content">
                        2016年第一次集体生日会来了，下午4：30在一层休闲区，这月的寿星有：金老师、HR姐姐、杜雪、逗年、滔姐、少一老师、刘洁和皮皮哥，祝几位大摩羯和大水瓶生日快乐~ 届时欢迎各位光年一起给他们过生日并吃蛋糕。
                    </div>
                    <div>
                        <button>编辑公告</button>
                    </div>
                </div>
            </FloatPanel>
        );
    }
}

export default connect(
    state => ({
        show: state.ui.showGroupNotice,
    })
)(GroupNotice);
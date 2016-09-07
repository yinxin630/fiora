import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import './style/groupNotice.scss';

import ui from '../../action/ui';
import FloatPanel from './floatPanel';

class GroupNotice extends React.Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
        creator: PropTypes.object,
        me: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            editor: false,
        };
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const { show, creator, me } = this.props;

        return (
            <FloatPanel
                onClose={ui.closeGroupNotice}
                show={show}
                title="群公告"
            >
                <div className="group-notice">
                    <div>碎碎酱 更新于 11月11日 11:11</div>
                    {
                        this.state.editor ?
                            <textarea
                                className="editor"
                                defaultValue="2016年第一次集体生日会来了，下午4：30在一层休闲区，这月的寿星有：金老师、HR姐姐、杜雪、逗年、滔姐、少一老师、刘洁和皮皮哥，祝几位大摩羯和大水瓶生日快乐~ 届时欢迎各位光年一起给他们过生日并吃蛋糕。"
                            />
                        :
                            <div className="content">
                                2016年第一次集体生日会来了，下午4：30在一层休闲区，这月的寿星有：金老师、HR姐姐、杜雪、逗年、滔姐、少一老师、刘洁和皮皮哥，祝几位大摩羯和大水瓶生日快乐~ 届时欢迎各位光年一起给他们过生日并吃蛋糕。
                            </div>
                    }
                    {
                        creator && creator.get('_id') === me ?
                            <div>
                            {
                                this.state.editor ?
                                    <button>保存</button>
                                :
                                    <button
                                        onClick={() => this.setState({ editor: true })}
                                    >编辑公告</button>
                            }
                            </div>
                        :
                            null
                    }
                </div>
            </FloatPanel>
        );
    }
}

export default connect(
    state => ({
        show: state.getIn(['ui', 'showGroupNotice']),
    })
)(GroupNotice);

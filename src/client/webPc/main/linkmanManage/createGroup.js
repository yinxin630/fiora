import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import InputForm from './inputForm';
import ui from '../../../action/ui';
import user from '../../../action/user';

class CreateGroup extends React.Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick(text) {
        user.createGroup(text).then(response => {
            if (response.status === 201) {
                ui.closeCreateGroupInput();
                ui.closeMaskLayout();
                this.context.router.push('/main/chat');
            }
            else {
                if (response.data === 'group name already exists') {
                    ui.openNotification('群组名称已存在');
                }
                else if (response.data === 'group name invalid') {
                    ui.openNotification('群组名称错误. 仅能使用字母,数字,汉字,横线-,下划线_');
                }
                else if (response.data === 'every one can create only one group') {
                    ui.openNotification('每个人只能创建一个群组. 请删除已经创建群组');
                }
                else {
                    ui.openNotification('创建失败! 服务器发生错误, 请联系管理员.');
                }
            }
        });
    }

    handleClose() {
        ui.closeCreateGroupInput();
        ui.closeMaskLayout();
    }

    render() {
        const { show } = this.props;

        return (
            <InputForm
                show={show}
                title="请输入群组名"
                onClick={this.handleClick}
                onClose={this.handleClose}
            />
        );
    }
}

export default connect(
    state => ({
        show: state.getIn(['ui', 'showCreateGroupInput']),
    })
)(CreateGroup);

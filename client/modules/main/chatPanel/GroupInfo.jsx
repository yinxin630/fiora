import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import autobind from 'autobind-decorator';

import Dialog from '@/components/Dialog';
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import action from '@/state/action';
import fetch from 'utils/fetch';

class GroupInfo extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        groupInfo: PropTypes.object,
        onClose: PropTypes.func,
        linkmans: ImmutablePropTypes.list,
    }
    @autobind
    async handleJoinGroup() {
        const { groupInfo, onClose } = this.props;
        onClose();
        const [err, res] = await fetch('joinGroup', { groupId: groupInfo._id });
        if (!err) {
            res.type = 'group';
            action.addLinkman(res, true);
            const [err2, messages] = await fetch('getLinkmanHistoryMessages', { linkmanId: res._id, existCount: 0 });
            if (!err2) {
                action.addLinkmanMessages(res._id, messages);
            }
        }
    }
    @autobind
    handleFocusGroup() {
        const { groupInfo, onClose } = this.props;
        onClose();
        action.setFocus(groupInfo._id);
    }
    render() {
        const { visible, groupInfo, onClose, linkmans } = this.props;
        return (
            <Dialog className="info-dialog" visible={visible} onClose={onClose}>
                {
                    visible && groupInfo ?
                        <div className="content">
                            <div className="header">
                                <Avatar size={60} src={groupInfo.avatar} />
                                <p>{groupInfo.name}</p>
                            </div>
                            <div className="info">
                                <div>
                                    <p>成员:</p>
                                    <div>{groupInfo.members}人</div>
                                </div>
                                {
                                    linkmans.find(l => l.get('_id') === groupInfo._id) ?
                                        <Button onClick={this.handleFocusGroup}>发送消息</Button>
                                        :
                                        <Button onClick={this.handleJoinGroup}>加入群组</Button>
                                }
                            </div>
                        </div>
                        :
                        null
                }
            </Dialog>
        );
    }
}

export default connect(state => ({
    linkmans: state.getIn(['user', 'linkmans']),
}))(GroupInfo);

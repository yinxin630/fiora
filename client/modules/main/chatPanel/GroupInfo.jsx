import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';

import Dialog from '@/components/Dialog';
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import action from '@/state/action';
import fetch from 'utils/fetch';

@immutableRenderDecorator
class GroupInfo extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        groupInfo: PropTypes.object,
        onClose: PropTypes.func,
        hasLinkman: PropTypes.bool.isRequired,
    }
    handleJoinGroup = async () => {
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
    handleFocusGroup = () => {
        const { groupInfo, onClose } = this.props;
        onClose();
        action.setFocus(groupInfo._id);
    }
    render() {
        const { visible, groupInfo, onClose, hasLinkman } = this.props;
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
                                    hasLinkman ?
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

export default connect((state, props) => {
    if (!props.visible) {
        return {
            hasLinkman: false,
        };
    }
    const hasLinkman = state
        .getIn(['user', 'linkmans'])
        .findIndex(l => l.get('_id') === props.groupInfo._id) !== -1;
    return {
        hasLinkman,
    };
})(GroupInfo);

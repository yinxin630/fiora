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
import getFriendId from 'utils/getFriendId';

class UserInfo extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        userInfo: PropTypes.object,
        onClose: PropTypes.func,
        linkmans: ImmutablePropTypes.list,
        userId: PropTypes.string,
    }
    @autobind
    handleFocusUser() {
        const { userInfo, userId, onClose } = this.props;
        onClose();
        action.setFocus(getFriendId(userInfo._id, userId));
    }
    @autobind
    async handleAddFriend() {
        const { userInfo, userId, linkmans, onClose } = this.props;
        onClose();
        const [err, res] = await fetch('addFrient', { userId: userInfo._id });
        if (!err) {
            const _id = getFriendId(userId, res._id);
            if (linkmans.find(l => l.get('_id') === _id && l.get('type') === 'temporary')) {
                action.setFriend(_id);
            } else {
                const newLinkman = {
                    _id: getFriendId(userId, res._id),
                    type: 'friend',
                    createTime: Date.now(),
                    avatar: res.avatar,
                    name: res.username,
                    messages: [],
                    unread: 0,
                };
                action.addLinkman(newLinkman, true);
            }
        }
    }
    render() {
        const { visible, userInfo, onClose, linkmans } = this.props;
        return (
            <Dialog className="info-dialog" visible={visible} onClose={onClose}>
                <div>
                    {
                        visible && userInfo ?
                            <div className="content">
                                <div className="header">
                                    <Avatar size={60} src={userInfo.avatar} />
                                    <p>{userInfo.username}</p>
                                </div>
                                <div className="info">
                                    {
                                        linkmans.find(l => l.get('to') === userInfo._id && l.get('type') === 'friend') ?
                                            <Button onClick={this.handleFocusUser}>发送消息</Button>
                                            :
                                            <Button onClick={this.handleAddFriend}>加为好友</Button>
                                    }
                                </div>
                            </div>
                            :
                            null
                    }
                </div>
            </Dialog>
        );
    }
}

export default connect(state => ({
    linkmans: state.getIn(['user', 'linkmans']),
    userId: state.getIn(['user', '_id']),
}))(UserInfo);

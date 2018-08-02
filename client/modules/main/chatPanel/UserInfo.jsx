import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import autobind from 'autobind-decorator';
import immutable from 'immutable';

import Dialog from '@/components/Dialog';
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import Message from '@/components/Message';
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
        isAdmin: PropTypes.bool.isRequired,
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
        const [err, res] = await fetch('addFriend', { userId: userInfo._id });
        if (!err) {
            onClose();
            const _id = getFriendId(userId, res._id);
            let existCount = 0;
            const linkman = linkmans.find(l => l.get('_id') === _id && l.get('type') === 'temporary');
            if (linkman) {
                existCount = linkman.get('messages').size;
                action.setFriend(_id, userId, userInfo._id);
            } else {
                const newLinkman = {
                    _id,
                    type: 'friend',
                    createTime: Date.now(),
                    avatar: res.avatar,
                    name: res.username,
                    messages: [],
                    unread: 0,
                    from: res.from,
                    to: res.to,
                };
                action.addLinkman(newLinkman, true);
            }
            const [err2, messages] = await fetch('getLinkmanHistoryMessages', { linkmanId: _id, existCount });
            if (!err2) {
                action.addLinkmanMessages(_id, messages);
            }
        }
    }
    @autobind
    async handleDeleteFriend() {
        const { userInfo, userId, onClose } = this.props;
        const [err] = await fetch('deleteFriend', { userId: userInfo._id });
        if (!err) {
            onClose();
            action.removeLinkman(getFriendId(userId, userInfo._id));
            Message.success('删除好友成功');
        }
    }
    @autobind
    async handleSeal() {
        const [err] = await fetch('sealUser', { username: this.props.userInfo.username });
        if (!err) {
            Message.success('封禁用户成功');
        }
    }
    render() {
        const { visible, userInfo, onClose, linkmans, isAdmin } = this.props;
        const isFriend = linkmans.find(l => l.get('to') === userInfo._id && l.get('type') === 'friend');
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
                                {
                                    userInfo._id === '5adad39555703565e7903f79' && userInfo.username !== 'robot10' ?
                                        <div className="info">
                                            <p>这是一个外星人</p>
                                        </div>
                                        :
                                        <div className="info">
                                            {
                                                isFriend ? <Button onClick={this.handleFocusUser}>发送消息</Button> : null
                                            }
                                            {
                                                isFriend ?
                                                    <Button type="danger" onClick={this.handleDeleteFriend}>删除好友</Button>
                                                    :
                                                    <Button onClick={this.handleAddFriend}>加为好友</Button>
                                            }
                                            {
                                                isAdmin ? <Button type="danger" onClick={this.handleSeal}>封禁用户</Button> : null
                                            }
                                        </div>
                                }
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
    linkmans: state.getIn(['user', 'linkmans']) || immutable.fromJS([]),
    userId: state.getIn(['user', '_id']),
    isAdmin: state.getIn(['user', 'isAdmin']),
}))(UserInfo);

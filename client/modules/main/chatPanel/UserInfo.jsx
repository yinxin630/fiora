import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import ImmutablePropTypes from 'react-immutable-proptypes';

import fetch from '../../../../utils/fetch';
import getFriendId from '../../../../utils/getFriendId';
import Dialog from '../../../components/Dialog';
import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';
import Message from '../../../components/Message';
import action from '../../../state/action';

@immutableRenderDecorator
class UserInfo extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        // eslint-disable-next-line react/forbid-prop-types
        userInfo: PropTypes.object.isRequired,
        onClose: PropTypes.func.isRequired,
        linkman: ImmutablePropTypes.map,
        userId: PropTypes.string,
        isAdmin: PropTypes.bool,
    };

    static defaultProps = {
        linkman: null,
        userId: '',
        isAdmin: false,
    }

    constructor(...args) {
        super(...args);
        this.state = {
            showLargeAvatar: false,
        };
    }

    handleFocusUser = () => {
        const { userInfo, userId, onClose } = this.props;
        onClose();
        action.setFocus(getFriendId(userInfo._id, userId));
    };

    handleAddFriend = async () => {
        const {
            userInfo, userId, linkman, onClose,
        } = this.props;
        const [err, res] = await fetch('addFriend', { userId: userInfo._id });
        if (!err) {
            onClose();
            const _id = getFriendId(userId, res._id);
            let existCount = 0;
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
            const [err2, messages] = await fetch('getLinkmanHistoryMessages', {
                linkmanId: _id,
                existCount,
            });
            if (!err2) {
                action.addLinkmanMessages(_id, messages);
            }
        }
    };

    handleDeleteFriend = async () => {
        const { userInfo, userId, onClose } = this.props;
        const [err] = await fetch('deleteFriend', { userId: userInfo._id });
        if (!err) {
            onClose();
            action.removeLinkman(getFriendId(userId, userInfo._id));
            Message.success('删除好友成功');
        }
    };

    handleSeal = async () => {
        // eslint-disable-next-line react/destructuring-assignment
        const [err] = await fetch('sealUser', { username: this.props.userInfo.username });
        if (!err) {
            Message.success('封禁用户成功');
        }
    };

    mouseEnterAvatar = () => {
        this.setState({
            showLargeAvatar: true,
        });
    };

    mouseLeaveAvatar = () => {
        this.setState({
            showLargeAvatar: false,
        });
    };

    render() {
        const {
            visible, userInfo, onClose, linkman, isAdmin,
        } = this.props;
        const { showLargeAvatar } = this.state;
        const isFriend = linkman && linkman.get('type') === 'friend';
        return (
            <Dialog className="info-dialog" visible={visible} onClose={onClose}>
                <div>
                    {visible && userInfo ? (
                        <div className="content">
                            <div className="header">
                                <Avatar
                                    size={60}
                                    src={userInfo.avatar}
                                    onMouseEnter={this.mouseEnterAvatar}
                                    onMouseLeave={this.mouseLeaveAvatar}
                                />
                                <img
                                    className={`large-avatar ${showLargeAvatar ? 'show' : 'hide'}`}
                                    src={userInfo.avatar}
                                    alt="用户头像"
                                />
                                <p>{userInfo.username}</p>
                            </div>
                            {userInfo._id === '5adad39555703565e7903f79'
                            && userInfo.username !== 'robot10'
                                ? (
                                    <div className="info">
                                        <p>这是一个外星人</p>
                                    </div>
                                )
                                : (
                                    <div className="info">
                                        {isFriend ? (
                                            <Button onClick={this.handleFocusUser}>发送消息</Button>
                                        ) : null}
                                        {isFriend ? (
                                            <Button type="danger" onClick={this.handleDeleteFriend}>
                                            删除好友
                                            </Button>
                                        ) : (
                                            <Button onClick={this.handleAddFriend}>加为好友</Button>
                                        )}
                                        {isAdmin ? (
                                            <Button type="danger" onClick={this.handleSeal}>
                                            封禁用户
                                            </Button>
                                        ) : null}
                                    </div>
                                )}
                        </div>
                    ) : null}
                </div>
            </Dialog>
        );
    }
}

export default connect((state, props) => {
    const userId = state.getIn(['user', '_id']);
    const isAdmin = state.getIn(['user', 'isAdmin']);
    if (!props.visible) {
        return {
            linkman: null,
            userId,
            isAdmin,
        };
    }

    const friendId = getFriendId(props.userInfo._id, userId);
    const linkman = state.getIn(['user', 'linkmans']).find((l) => l.get('_id') === friendId);
    return {
        linkman,
        userId: state.getIn(['user', '_id']),
        isAdmin: state.getIn(['user', 'isAdmin']),
    };
})(UserInfo);

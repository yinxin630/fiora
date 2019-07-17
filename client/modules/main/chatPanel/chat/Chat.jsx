import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import immutable from 'immutable';

import fetch from 'utils/fetch';
import action from '@/state/action';

import HeaderBar from './HeaderBar';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import UserInfo from '../UserInfo';
import './Chat.less';
import GroupManagePanel from './GroupManagePanel';

class Chat extends Component {
    static propTypes = {
        focus: PropTypes.string,
        members: ImmutablePropTypes.list,
        userId: PropTypes.string,
        creator: PropTypes.string,
        avatar: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
    }
    constructor(...args) {
        super(...args);
        this.state = {
            groupInfoDialog: false,
            userInfoDialog: false,
            userInfo: {},
        };
    }
    componentDidMount() {
        document.body.addEventListener('click', this.handleBodyClick, false);
    }
    componentWillUnmount() {
        document.body.removeEventListener('click', this.handleBodyClick, false);
    }
    handleBodyClick = (e) => {
        if (!this.state.groupInfoDialog) {
            return;
        }

        const { currentTarget } = e;
        let { target } = e;
        do {
            if (/float-panel/.test(target.className)) {
                return;
            }
            target = target.parentElement;
        } while (target && target !== currentTarget);
        this.closeGroupInfo();
    }
    groupInfoDialog = async (e) => {
        const { focus, userId } = this.props;
        this.setState({
            groupInfoDialog: true,
        });
        e.stopPropagation();
        e.preventDefault();

        let err = null;
        let result = null;
        if (userId) {
            [err, result] = await fetch('getGroupOnlineMembers', { groupId: focus });
        } else {
            [err, result] = await fetch('getDefaultGroupOnlineMembers', { });
        }
        if (!err) {
            action.setGroupMembers(focus, result);
        }
    }
    closeGroupInfo = () => {
        this.setState({
            groupInfoDialog: false,
        });
    }
    showUserInfoDialog = (userInfo) => {
        this.setState({
            userInfoDialog: true,
            userInfo,
        });
    }
    closeUserInfoDialog = () => {
        this.setState({
            userInfoDialog: false,
        });
    }

    /**
     * 点击群组信息在线用户列表的用户事件
     * @param {ImmutableMap} member 群组成员
     */
    showGroupUser = (member) => {
        // 如果是自己, 则不展示
        if (member.getIn(['user', '_id']) === this.props.userId) {
            return;
        }
        this.showUserInfoDialog(member.get('user').toJS());
    }

    render() {
        const { groupInfoDialog, userInfoDialog, userInfo } = this.state;
        const { userId, creator, avatar, type, focus = '', name, members } = this.props;

        if (!focus && !!userId) {
            return (
                <div className="module-main-chat">
                    <div className="no-linkman">
                        <div />
                        <h2>加个群或者好友呀, 不然怎么聊天~~</h2>
                    </div>
                </div>
            );
        }

        return (
            <div className="module-main-chat">
                <HeaderBar onShowInfo={type === 'group' ? this.groupInfoDialog : this.showUserInfoDialog.bind(this, { _id: focus.replace(userId, ''), username: name, avatar })} />
                <MessageList showUserInfoDialog={this.showUserInfoDialog} />
                <ChatInput members={members} />

                <GroupManagePanel
                    visible={groupInfoDialog}
                    groupId={focus}
                    userId={userId}
                    creator={creator}
                    avatar={avatar}
                    members={members}
                    showGroupUser={this.showGroupUser}
                    onClose={this.closeGroupInfo}
                />

                <UserInfo
                    visible={userInfoDialog}
                    userInfo={userInfo}
                    onClose={this.closeUserInfoDialog}
                />
            </div>
        );
    }
}

export default connect((state) => {
    const isLogin = !!state.getIn(['user', '_id']);
    if (!isLogin) {
        return {
            userId: '',
            focus: state.getIn(['user', 'linkmans', 0, '_id']),
            creator: '',
            avatar: state.getIn(['user', 'linkmans', 0, 'avatar']),
            members: state.getIn(['user', 'linkmans', 0, 'members']) || immutable.List(),
        };
    }

    const focus = state.get('focus');
    if (!focus) {
        return {
            userId: state.getIn(['user', '_id']),
            focus,
        };
    }

    const linkman = state.getIn(['user', 'linkmans']).find(g => g.get('_id') === focus);
    return {
        userId: state.getIn(['user', '_id']),
        focus,
        type: linkman.get('type'),
        creator: linkman.get('creator'),
        name: linkman.get('name'),
        avatar: linkman.get('avatar'),
        members: linkman.get('members') || immutable.fromJS([]),
    };
})(Chat);

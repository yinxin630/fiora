import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import immutable from 'immutable';
import * as qiniu from 'qiniu-js';

import fetch from 'utils/fetch';
import readDiskFile from 'utils/readDiskFile';
import config from 'root/config/client';
import action from '@/state/action';
import Avatar from '@/components/Avatar';
import Tooltip from '@/components/Tooltip';
import Message from '@/components/Message';
import Button from '@/components/Button';
import HeaderBar from './HeaderBar';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import UserInfo from '../UserInfo';
import './Chat.less';

class Chat extends Component {
    static propTypes = {
        focus: PropTypes.string,
        members: ImmutablePropTypes.list,
        userId: PropTypes.string,
        creator: PropTypes.string,
        avatar: PropTypes.string,
        to: PropTypes.string,
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
        document.body.addEventListener('click', this.handleBodyClick.bind(this), false);
    }
    handleBodyClick(e) {
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
        } while (target !== currentTarget);
        this.closeGroupInfo();
    }
    @autobind
    async groupInfoDialog(e) {
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
    @autobind
    closeGroupInfo() {
        this.setState({
            groupInfoDialog: false,
        });
    }
    @autobind
    showUserInfoDialog(userInfo) {
        this.setState({
            userInfoDialog: true,
            userInfo,
        });
    }
    @autobind
    closeUserInfoDialog() {
        this.setState({
            userInfoDialog: false,
        });
    }
    @autobind
    async changeGroupAvatar() {
        const { userId, focus } = this.props;
        const image = await readDiskFile('blob', 'image/png,image/jpeg,image/gif');
        if (!image) {
            return;
        }
        if (image.length > config.maxImageSize) {
            return Message.error('设置群头像失败, 请选择小于1MB的图片');
        }

        const [err, tokenRes] = await fetch('uploadToken', {});
        if (!err) {
            const result = qiniu.upload(image.result, `GroupAvatar/${userId}_${Date.now()}`, tokenRes.token, { useCdnDomain: true }, {});
            result.subscribe({
                error(e) {
                    console.error(e);
                    Message.error('上传群头像失败');
                },
                async complete(info) {
                    const imageUrl = `${tokenRes.urlPrefix + info.key}`;
                    const [changeGroupAvatarError] = await fetch('changeGroupAvatar', { groupId: focus, avatar: imageUrl });
                    if (!changeGroupAvatarError) {
                        action.setGroupAvatar(focus, URL.createObjectURL(image.result));
                        Message.success('修改群头像成功');
                    }
                },
            });
        }
    }
    @autobind
    async leaveGroup() {
        const { focus } = this.props;
        const [err] = await fetch('leaveGroup', { groupId: focus });
        if (!err) {
            this.closeGroupInfo();
            action.removeLinkman(focus);
            Message.success('退出群组成功');
        }
    }
    /**
     * 点击群组信息在线用户列表的用户事件
     * @param {ImmutableMap} member 群组成员
     */
    handleClickGroupInfoUser(member) {
        // 如果是自己, 则不展示
        if (member.getIn(['user', '_id']) === this.props.userId) {
            return;
        }
        this.showUserInfoDialog(member.get('user').toJS());
    }
    /**
     * 渲染群组内在线用户列表
     */
    renderMembers() {
        return this.props.members.map(member => (
            <div key={member.get('_id')}>
                <div onClick={this.handleClickGroupInfoUser.bind(this, member)}>
                    <Avatar size={24} src={member.getIn(['user', 'avatar'])} />
                    <p>{member.getIn(['user', 'username'])}</p>
                </div>
                <Tooltip placement="top" trigger={['hover']} overlay={<span>{member.get('environment')}</span>}>
                    <p>
                        {member.get('browser')}
                        &nbsp;&nbsp;
                        {member.get('os') === 'Windows Server 2008 R2 / 7' ? 'Windows 7' : member.get('os')}
                    </p>
                </Tooltip>
            </div>
        ));
    }
    render() {
        const { groupInfoDialog, userInfoDialog, userInfo } = this.state;
        const { userId, creator, avatar, type, to, name } = this.props;
        return (
            <div className="module-main-chat">
                <HeaderBar onShowInfo={type === 'group' ? this.groupInfoDialog : this.showUserInfoDialog.bind(this, { _id: to, username: name, avatar })} />
                <MessageList showUserInfoDialog={this.showUserInfoDialog} />
                <ChatInput />
                <div className={`float-panel group-info ${groupInfoDialog ? 'show' : 'hide'}`}>
                    <p>群组信息</p>
                    <div>
                        <div className="avatar" style={{ display: !!userId && userId === creator ? 'block' : 'none' }}>
                            <p>群头像</p>
                            <img src={avatar} onClick={this.changeGroupAvatar} />
                        </div>
                        <div className="feature" style={{ display: !!userId && userId === creator ? 'none' : 'block' }}>
                            <p>功能</p>
                            <Button type="danger" onClick={this.leaveGroup}>退出群组</Button>
                        </div>
                        <div className="online-members">
                            <p>在线成员 &nbsp;<span>{this.props.members.size}</span></p>
                            <div>{this.renderMembers()}</div>
                        </div>
                    </div>
                </div>
                { userInfoDialog ? <UserInfo visible={userInfoDialog} userInfo={userInfo} onClose={this.closeUserInfoDialog} /> : ''}
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
    const linkman = state.getIn(['user', 'linkmans']).find(g => g.get('_id') === focus);

    return {
        userId: state.getIn(['user', '_id']),
        focus,
        type: linkman.get('type'),
        creator: linkman.get('creator'),
        to: linkman.get('to'),
        name: linkman.get('name'),
        avatar: linkman.get('avatar'),
        members: linkman.get('members') || immutable.fromJS([]),
    };
})(Chat);

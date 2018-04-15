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
import HeaderBar from './HeaderBar';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import './Chat.less';

class Chat extends Component {
    static propTypes = {
        focusGroup: PropTypes.string,
        members: ImmutablePropTypes.list,
        userId: PropTypes.string,
        creator: PropTypes.string,
        avatar: PropTypes.string,
    }
    constructor(...args) {
        super(...args);
        this.state = {
            showGroupInfo: false,
        };
    }
    componentDidMount() {
        document.body.onclick = (e) => {
            const { currentTarget } = e;
            let { target } = e;
            do {
                if (/float-panel/.test(target.className)) {
                    return;
                }
                target = target.parentElement;
            } while (target !== currentTarget);
            this.closeGroupInfo();
        };
    }
    @autobind
    async showGroupInfo(e) {
        const { focusGroup } = this.props;
        this.setState({
            showGroupInfo: true,
        });
        e.stopPropagation();

        const [err, result] = await fetch('getGroupOnlineMembers', { groupId: focusGroup });
        if (!err) {
            action.setGroupMembers(focusGroup, result);
        }
    }
    @autobind
    closeGroupInfo() {
        this.setState({
            showGroupInfo: false,
        });
    }
    @autobind
    async changeGroupAvatar() {
        const { userId, focusGroup } = this.props;
        const image = await readDiskFile('blob', 'image/png,image/jpeg,image/gif');
        if (image.length > config.maxImageSize) {
            return Message.error('设置群头像失败, 请选择小于1MB的图片');
        }

        const [err, tokenRes] = await fetch('uploadToken', {});
        if (!err) {
            const result = qiniu.upload(image.result, `Avatar/${userId}_${Date.now()}`, tokenRes.token, { useCdnDomain: true }, {});
            result.subscribe({
                error(e) {
                    console.error(e);
                    Message.error('上传群头像失败');
                },
                async complete(info) {
                    const imageUrl = `${tokenRes.urlPrefix + info.key}`;
                    const [changeGroupAvatarError] = await fetch('changeGroupAvatar', { groupId: focusGroup, avatar: imageUrl });
                    if (!changeGroupAvatarError) {
                        action.setGroupAvatar(focusGroup, URL.createObjectURL(image.result));
                        Message.success('修改群头像成功');
                    }
                },
            });
        }
    }
    renderMembers() {
        return this.props.members.map(member => (
            <div key={member.get('_id')}>
                <div>
                    <Avatar size={24} src={member.getIn(['user', 'avatar'])} />
                    <p>{member.getIn(['user', 'username'])}</p>
                </div>
                <Tooltip placement="top" trigger={['hover']} overlay={<span>{member.get('environment')}</span>}>
                    <p>{member.get('browser')}&nbsp;&nbsp;{member.get('os')}</p>
                </Tooltip>
            </div>
        ));
    }
    render() {
        const { showGroupInfo } = this.state;
        const { userId, creator, avatar } = this.props;
        return (
            <div className="module-main-chat">
                <HeaderBar showGroupInfo={this.showGroupInfo} />
                <MessageList />
                <ChatInput />
                <div className={`float-panel info ${showGroupInfo ? 'show' : 'hide'}`}>
                    <p>群组信息</p>
                    <div>
                        <div className="avatar" style={{ display: userId === creator ? 'block' : 'none' }}>
                            <p>群头像</p>
                            <img src={avatar} onClick={this.changeGroupAvatar} />
                        </div>
                        <div className="online-members">
                            <p>在线成员</p>
                            <div>{this.renderMembers()}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    const isLogin = !!state.getIn(['user', '_id']);
    if (!isLogin) {
        return {
            userId: '',
            focusGroup: state.getIn(['user', 'groups', 0, '_id']),
            creator: '',
            avatar: state.getIn(['user', 'groups', 0, 'avatar']),
            members: state.getIn(['user', 'groups', 0, 'members']) || immutable.fromJS([]),
        };
    }

    const focusGroup = state.get('focusGroup');
    const group = state.getIn(['user', 'groups']).find(g => g.get('_id') === focusGroup);

    return {
        userId: state.getIn(['user', '_id']),
        focusGroup,
        creator: group.get('creator'),
        avatar: group.get('avatar'),
        members: group.get('members') || immutable.fromJS([]),
    };
})(Chat);

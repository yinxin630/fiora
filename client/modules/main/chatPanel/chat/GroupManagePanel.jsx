import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import action from '@/state/action';
import readDiskFIle from 'utils/readDiskFile';
import uploadFile from 'utils/uploadFile';
import fetch from 'utils/fetch';

import config from 'root/config/client';
import { Input, Message, Button, Avatar, Tooltip } from '../../../../components';

GroupManagePanel.propTypes = {
    visible: PropTypes.bool,
    groupId: PropTypes.string,
    userId: PropTypes.string,
    creator: PropTypes.string,
    avatar: PropTypes.string,
    members: ImmutablePropTypes.list,
    showGroupUser: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

/**
 * Group Management Panel. Administrators and regular users will see different content
 * @param {object} props
 */
export default function GroupManagePanel({
    visible = false,
    groupId = '',
    userId = '',
    creator = '',
    avatar = '',
    members = Immutable.List(),
    showGroupUser,
    onClose,
}) {
    const nameInput = React.useRef();

    async function changeGroupName() {
        const newName = this.groupNameInput.getValue();
        const [error] = await fetch('changeGroupName', {
            groupId,
            name: this.groupNameInput.current.getValue(),
        });
        if (!error) {
            Message.success('修改群名称成功');
            action.setGroupName(groupId, newName);
        }
    }

    async function changeGroupAvatar() {
        const image = await readDiskFIle('blob', 'image/png,image/jpeg,image/gif');
        if (!image) {
            return;
        }
        if (image.length > config.maxImageSize) {
            return Message.error('设置群头像失败, 请选择小于1MB的图片');
        }

        try {
            const imageUrl = await uploadFile(image.result, `GroupAvatar/${userId}_${Date.now()}`, `GroupAvatar_${userId}_${Date.now()}.${image.ext}`);
            const [changeGroupAvatarError] = await fetch('changeGroupAvatar', { groupId, avatar: imageUrl });
            if (!changeGroupAvatarError) {
                action.setGroupAvatar(groupId, URL.createObjectURL(image.result));
                Message.success('修改群头像成功');
            }
        } catch (err) {
            console.error(err);
            Message.error('上传群头像失败');
        }
    }

    async function deleteGroup() {
        const [err] = await fetch('deleteGroup', { groupId });
        if (!err) {
            onClose();
            action.removeLinkman(groupId);
            Message.success('解散群组成功');
        }
    }

    async function leaveGroup() {
        const [err] = await fetch('leaveGroup', { groupId });
        if (!err) {
            onClose();
            action.removeLinkman(groupId);
            Message.success('退出群组成功');
        }
    }

    return (
        <div className={`float-panel group-info ${visible ? 'show' : 'hide'}`}>
            <p>群组信息</p>
            <div>
                {
                    !!userId && userId === creator ?
                        <div className="name">
                            <p>修改群名称</p>
                            <Input ref={nameInput} />
                            <Button onClick={changeGroupName}>确认修改</Button>
                        </div>
                        :
                        null
                }
                {
                    !!userId && userId === creator ?
                        <div className="avatar">
                            <p>修改群头像</p>
                            <img src={avatar} onClick={changeGroupAvatar} />
                        </div>
                        :
                        null
                }
                {
                    userId === creator ?
                        <div className="feature">
                            <p>解散群组</p>
                            <Button type="danger" onClick={deleteGroup}>确认解散</Button>
                        </div>
                        :
                        <div className="feature">
                            <p>退出群组</p>
                            <Button type="danger" onClick={leaveGroup}>确认退出</Button>
                        </div>
                }
                <div className="online-members">
                    <p>在线成员 &nbsp;<span>{members.size}</span></p>
                    <div>
                        {
                            members.map(member => (
                                <div key={member.get('_id')}>
                                    <div onClick={() => showGroupUser(member)}>
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
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

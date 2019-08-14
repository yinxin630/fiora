import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import readDiskFIle from '../../../../../utils/readDiskFile';
import uploadFile from '../../../../../utils/uploadFile';
import fetch from '../../../../../utils/fetch';

import config from '../../../../../config/client';
import action from '../../../../state/action';
import {
    Input, Message, Button, Avatar, Tooltip, Dialog,
} from '../../../../components';

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
    const [deleteConfirmDialog, setDialogStatus] = React.useState(false);

    async function changeGroupName() {
        const newName = nameInput.current.getValue();
        const [error] = await fetch('changeGroupName', {
            groupId,
            name: nameInput.current.getValue(),
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
            // eslint-disable-next-line consistent-return
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
            setDialogStatus(false);
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

    function handleClickMask(e) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <div className={`float-panel group-info ${visible ? 'show' : 'hide'}`} onClick={handleClickMask} role="button">
            <div className="container">
                <p>群组信息</p>
                <div>
                    {
                        !!userId && userId === creator
                            ? (
                                <div className="name">
                                    <p>修改群名称</p>
                                    <Input ref={nameInput} />
                                    <Button onClick={changeGroupName}>确认修改</Button>
                                </div>
                            )
                            : null
                    }
                    {
                        !!userId && userId === creator
                            ? (
                                <div className="avatar">
                                    <p>修改群头像</p>
                                    <img src={avatar} alt="群头像预览" onClick={changeGroupAvatar} />
                                </div>
                            )
                            : null
                    }

                    <div className="feature">
                        <p>功能</p>
                        {
                            userId === creator
                                ? <Button type="danger" onClick={() => setDialogStatus(true)}>解散群组</Button>
                                : <Button type="danger" onClick={leaveGroup}>退出群组</Button>
                        }
                    </div>
                    <div className="online-members">
                        <p>在线成员 &nbsp;<span>{members.size}</span></p>
                        <div>
                            {
                                members.map((member) => (
                                    <div key={member.get('_id')}>
                                        <div onClick={() => showGroupUser(member)} role="button">
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
                    <Dialog
                        className="delete-gourp-confirm-dialog"
                        title="再次确认解散群组?"
                        visible={deleteConfirmDialog}
                        onClose={() => setDialogStatus(false)}
                    >
                        <Button type="danger" onClick={deleteGroup}>确认</Button>
                        <Button onClick={() => setDialogStatus(false)}>取消</Button>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

GroupManagePanel.propTypes = {
    visible: PropTypes.bool.isRequired,
    groupId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    members: ImmutablePropTypes.list.isRequired,
    showGroupUser: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

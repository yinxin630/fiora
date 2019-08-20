import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import useIsLogin from '../../hooks/useIsLogin';
import { State, GroupMember } from '../../state/reducer';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Message from '../../components/Message';
import Avatar from '../../components/Avatar';
import Tooltip from '../../components/Tooltip';
import Dialog from '../../components/Dialog';
import { changeGroupName, changeGroupAvatar, deleteGroup, leaveGroup } from '../../service';
import useAction from '../../hooks/useAction';
import readDiskFIle from '../../../utils/readDiskFile';
import config from '../../../config/client';
import uploadFile from '../../../utils/uploadFile';

import Style from './GroupManagePanel.less';

interface GroupManagePanelProps {
    visible: boolean;
    onClose: () => void;
    groupId: string;
    avatar: string;
    creator: string;
    onlineMembers: GroupMember[];
}

function GroupManagePanel(props: GroupManagePanelProps) {
    const { visible, onClose, groupId, avatar, creator, onlineMembers } = props;

    const action = useAction();
    const isLogin = useIsLogin();
    const selfId = useSelector((state: State) => state.user._id);
    const [deleteConfirmDialog, setDialogStatus] = useState(false);
    const [groupName, setGroupName] = useState('');

    async function handleChangeGroupName() {
        const isSuccess = await changeGroupName(groupId, groupName);
        if (isSuccess) {
            Message.success('修改群名称成功');
            action.SetLinkmanProperty(groupId, 'name', groupName);
        }
    }

    async function handleChangeGroupAvatar() {
        const image = await readDiskFIle('blob', 'image/png,image/jpeg,image/gif');
        if (!image) {
            return;
        }
        if (image.length > config.maxImageSize) {
            // eslint-disable-next-line consistent-return
            return Message.error('设置群头像失败, 请选择小于1MB的图片');
        }

        try {
            const imageUrl = await uploadFile(
                image.result as Blob,
                `GroupAvatar/${selfId}_${Date.now()}`,
                `GroupAvatar_${selfId}_${Date.now()}.${image.ext}`,
            );
            const isSuccess = await changeGroupAvatar(groupId, imageUrl);
            if (isSuccess) {
                action.SetLinkmanProperty(groupId, 'avatar', URL.createObjectURL(image.result));
                Message.success('修改群头像成功');
            }
        } catch (err) {
            console.error(err);
            Message.error('上传群头像失败');
        }
    }

    async function handleDeleteGroup() {
        const isSuccess = await deleteGroup(groupId);
        if (isSuccess) {
            setDialogStatus(false);
            onClose();
            action.removeLinkman(groupId);
            Message.success('解散群组成功');
        }
    }

    async function handleLeaveGroup() {
        const isSuccess = await leaveGroup(groupId);
        if (isSuccess) {
            onClose();
            action.removeLinkman(groupId);
            Message.success('退出群组成功');
        }
    }

    function handleClickMask(e: React.MouseEvent) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <div
            className={`${Style.groupManagePanel} ${visible ? Style.show : Style.hide}`}
            onClick={handleClickMask}
            role="button"
            data-float-panel="true"
        >
            <div className={Style.container}>
                <p className={Style.title}>群组信息</p>
                <div className={Style.content}>
                    {isLogin && selfId === creator ? (
                        <div className={Style.block}>
                            <p className={Style.blockTitle}>修改群名称</p>
                            <Input
                                className={Style.input}
                                value={groupName}
                                onChange={setGroupName}
                            />
                            <Button className={Style.button} onClick={handleChangeGroupName}>
                                确认修改
                            </Button>
                        </div>
                    ) : null}
                    {isLogin && selfId === creator ? (
                        <div className={Style.block}>
                            <p className={Style.blockTitle}>修改群头像</p>
                            <img
                                className={Style.avatar}
                                src={avatar}
                                alt="群头像预览"
                                onClick={handleChangeGroupAvatar}
                            />
                        </div>
                    ) : null}

                    <div className={Style.block}>
                        <p className={Style.blockTitle}>功能</p>
                        {selfId === creator ? (
                            <Button
                                className={Style.button}
                                type="danger"
                                onClick={() => setDialogStatus(true)}
                            >
                                解散群组
                            </Button>
                        ) : (
                            <Button
                                className={Style.button}
                                type="danger"
                                onClick={handleLeaveGroup}
                            >
                                退出群组
                            </Button>
                        )}
                    </div>
                    <div className={Style.block}>
                        <p className={Style.blockTitle}>
                            在线成员 &nbsp;<span>{onlineMembers.length}</span>
                        </p>
                        <div>
                            {onlineMembers.map((member) => (
                                <div key={member.user._id} className={Style.onlineMember}>
                                    <div
                                        className={Style.userinfoBlock}
                                        onClick={() => console.log(member)}
                                        role="button"
                                    >
                                        <Avatar size={24} src={member.user.avatar} />
                                        <p className={Style.username}>{member.user.username}</p>
                                    </div>
                                    <Tooltip
                                        placement="top"
                                        trigger={['hover']}
                                        overlay={<span>{member.environment}</span>}
                                    >
                                        <p className={Style.clientInfoText}>
                                            {member.browser}
                                            &nbsp;&nbsp;
                                            {member.os === 'Windows Server 2008 R2 / 7'
                                                ? 'Windows 7'
                                                : member.os}
                                        </p>
                                    </Tooltip>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Dialog
                        className={Style.deleteGroupConfirmDialog}
                        title="再次确认解散群组?"
                        visible={deleteConfirmDialog}
                        onClose={() => setDialogStatus(false)}
                    >
                        <Button
                            className={Style.deleteGroupConfirmButton}
                            type="danger"
                            onClick={handleDeleteGroup}
                        >
                            确认
                        </Button>
                        <Button
                            className={Style.deleteGroupConfirmButton}
                            onClick={() => setDialogStatus(false)}
                        >
                            取消
                        </Button>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

export default GroupManagePanel;

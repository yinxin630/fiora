import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';

import readDiskFIle from '../../utils/readDiskFile';
import uploadFile, { getOSSFileUrl } from '../../utils/uploadFile';
import Style from './GroupManagePanel.less';
import useIsLogin from '../../hooks/useIsLogin';
import { State, GroupMember } from '../../state/reducer';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Message from '../../components/Message';
import Avatar from '../../components/Avatar';
import Tooltip from '../../components/Tooltip';
import Dialog from '../../components/Dialog';
import {
    changeGroupName,
    changeGroupAvatar,
    deleteGroup,
    leaveGroup,
} from '../../service';
import useAction from '../../hooks/useAction';
import config from '../../../../config/client';
import { ShowUserOrGroupInfoContext } from '../../context';

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
    const selfId = useSelector((state: State) => state.user?._id);
    const [deleteConfirmDialog, setDialogStatus] = useState(false);
    const [groupName, setGroupName] = useState('');
    const context = useContext(ShowUserOrGroupInfoContext);

    async function handleChangeGroupName() {
        const isSuccess = await changeGroupName(groupId, groupName);
        if (isSuccess) {
            Message.success('Group name modified successfully');
            action.setLinkmanProperty(groupId, 'name', groupName);
        }
    }

    async function handleChangeGroupAvatar() {
        const image = await readDiskFIle(
            'blob',
            'image/png,image/jpeg,image/gif',
        );
        if (!image) {
            return;
        }
        if (image.length > config.maxAvatarSize) {
            // eslint-disable-next-line consistent-return
            return Message.error('Failed to set group avatar, please choose a picture smaller than 1.5MB');
        }

        try {
            const imageUrl = await uploadFile(
                image.result as Blob,
                `GroupAvatar/${selfId}_${Date.now()}.${image.ext}`,
            );
            const isSuccess = await changeGroupAvatar(groupId, imageUrl);
            if (isSuccess) {
                action.setLinkmanProperty(
                    groupId,
                    'avatar',
                    URL.createObjectURL(image.result),
                );
                Message.success('Modified group avatar successfully');
            }
        } catch (err) {
            console.error(err);
            Message.error('Failed to upload group avatar');
        }
    }

    async function handleDeleteGroup() {
        const isSuccess = await deleteGroup(groupId);
        if (isSuccess) {
            setDialogStatus(false);
            onClose();
            action.removeLinkman(groupId);
            Message.success('Disband the group successfully');
        }
    }

    async function handleLeaveGroup() {
        const isSuccess = await leaveGroup(groupId);
        if (isSuccess) {
            onClose();
            action.removeLinkman(groupId);
            Message.success('Successfully exited the group');
        }
    }

    function handleClickMask(e: React.MouseEvent) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    function handleShowUserInfo(userInfo: any) {
        if (userInfo._id === selfId) {
            return;
        }
        // @ts-ignore
        context.showUserInfo(userInfo);
        onClose();
    }

    return (
        <div
            className={`${Style.groupManagePanel} ${visible ? 'show' : 'hide'}`}
            onClick={handleClickMask}
            role="button"
            data-float-panel="true"
        >
            <div
                className={`${Style.container} ${
                    visible ? Style.show : Style.hide
                }`}
            >
                <p className={Style.title}>group information</p>
                <div className={Style.content}>
                    {isLogin && selfId === creator ? (
                        <div className={Style.block}>
                            <p className={Style.blockTitle}>Modify group name</p>
                            <Input
                                className={Style.input}
                                value={groupName}
                                onChange={setGroupName}
                            />
                            <Button
                                className={Style.button}
                                onClick={handleChangeGroupName}
                            >
                                Confirm the changes
                            </Button>
                        </div>
                    ) : null}
                    {isLogin && selfId === creator ? (
                        <div className={Style.block}>
                            <p className={Style.blockTitle}>Modify group avatar</p>
                            <img
                                className={Style.avatar}
                                src={getOSSFileUrl(avatar)}
                                alt="群头像预览"
                                onClick={handleChangeGroupAvatar}
                            />
                        </div>
                    ) : null}

                    <div className={Style.block}>
                        <p className={Style.blockTitle}>Function</p>
                        {selfId === creator ? (
                            <Button
                                className={Style.button}
                                type="danger"
                                onClick={() => setDialogStatus(true)}
                            >
                                Disband group
                            </Button>
                        ) : (
                            <Button
                                className={Style.button}
                                type="danger"
                                onClick={handleLeaveGroup}
                            >
                                leave group
                            </Button>
                        )}
                    </div>
                    <div className={Style.block}>
                        <p className={Style.blockTitle}>
                        online member &nbsp;<span>{onlineMembers.length}</span>
                        </p>
                        <div>
                            {onlineMembers.map((member) => (
                                <div
                                    key={member.user._id}
                                    className={Style.onlineMember}
                                >
                                    <div
                                        className={Style.userinfoBlock}
                                        onClick={() =>
                                            handleShowUserInfo(member.user)
                                        }
                                        role="button"
                                    >
                                        <Avatar
                                            size={24}
                                            src={member.user.avatar}
                                        />
                                        <p className={Style.username}>
                                            {member.user.username}
                                        </p>
                                    </div>
                                    <Tooltip
                                        placement="top"
                                        trigger={['hover']}
                                        overlay={
                                            <span>{member.environment}</span>
                                        }
                                    >
                                        <p className={Style.clientInfoText}>
                                            {member.browser}
                                            &nbsp;&nbsp;
                                            {member.os ===
                                            'Windows Server 2008 R2 / 7'
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
                        title="Confirm again whether to disband the group?"
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
                            Cancel
                        </Button>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

export default GroupManagePanel;

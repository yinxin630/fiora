import React, { useState, useRef } from 'react';
import ReactLoading from 'react-loading';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import { useSelector } from 'react-redux';
import config from '@fiora/config/client';
import readDiskFile from '../../utils/readDiskFile';
import uploadFile, { getOSSFileUrl } from '../../utils/uploadFile';
import Dialog from '../../components/Dialog';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { State } from '../../state/reducer';
import Message from '../../components/Message';
import { changeAvatar, changePassword, changeUsername } from '../../service';
import useAction from '../../hooks/useAction';
import socket from '../../socket';

import Style from './SelfInfo.less';
import Common from './Common.less';

interface SelfInfoProps {
    visible: boolean;
    onClose: () => void;
}

function SelfInfo(props: SelfInfoProps) {
    const { visible, onClose } = props;

    const action = useAction();
    const userId = useSelector((state: State) => state.user?._id);
    const avatar = useSelector((state: State) => state.user?.avatar);
    const primaryColor = useSelector(
        (state: State) => state.status.primaryColor,
    );
    const [loading, toggleLoading] = useState(false);
    const [cropper, setCropper] = useState({
        enable: false,
        src: '',
        ext: '',
    });
    const $cropper = useRef(null);

    async function uploadAvatar(blob: Blob, ext = 'png') {
        toggleLoading(true);

        try {
            const avatarUrl = await uploadFile(
                blob,
                `Avatar/${userId}_${Date.now()}.${ext}`,
            );
            const isSuccess = await changeAvatar(avatarUrl);
            if (isSuccess) {
                action.setAvatar(URL.createObjectURL(blob));
                Message.success('Modify the profile picture successfully');
            }
        } catch (err) {
            console.error(err);
            Message.error('上传头像失败');
        } finally {
            toggleLoading(false);
            setCropper({ enable: false, src: '', ext: '' });
        }
    }

    async function selectAvatar() {
        const file = await readDiskFile(
            'blob',
            'image/png,image/jpeg,image/gif',
        );
        if (!file) {
            return;
        }
        if (file.length > config.maxAvatarSize) {
            // eslint-disable-next-line consistent-return
            return Message.error('Failed to set avatar, please select a picture smaller than 1.5MB');
        }

        // gif头像不需要裁剪
        if (file.ext === 'gif') {
            uploadAvatar(file.result as Blob, file.ext);
        } else {
            // 显示头像裁剪
            const reader = new FileReader();
            reader.readAsDataURL(file.result as Blob);
            reader.onloadend = () => {
                setCropper({
                    enable: true,
                    src: reader.result as string,
                    ext: file.ext,
                });
            };
        }
    }

    function handleChangeAvatar() {
        // @ts-ignore
        $cropper.current.getCroppedCanvas().toBlob(async (blob: any) => {
            uploadAvatar(blob, cropper.ext);
        });
    }

    function reLogin(message: string) {
        action.logout();
        window.localStorage.removeItem('token');
        Message.success(message);
        socket.disconnect();
        socket.connect();
    }

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    async function handleChangePassword() {
        const isSuccess = await changePassword(oldPassword, newPassword);
        if (isSuccess) {
            onClose();
            reLogin('The password has been changed successfully, please log in again with the new password');
        }
    }

    const [username, setUsername] = useState('');

    /**
     * 修改用户名
     */
    async function handleChangeUsername() {
        const isSuccess = await changeUsername(username);
        if (isSuccess) {
            onClose();
            reLogin('The username has been changed successfully, please log in again with the new username');
        }
    }

    function handleCloseDialog(event: any) {
        /**
         * 点击关闭按钮, 或者在非图片裁剪时点击蒙层, 才能关闭弹窗
         */
        if (event.target.className === 'rc-dialog-close-x' || !cropper.enable) {
            onClose();
        }
    }

    return (
        <Dialog
            className={Style.selfInfo}
            visible={visible}
            title="Personal Information Settings"
            onClose={handleCloseDialog}
        >
            <div className={Common.container}>
                <div className={Common.block}>
                    <p className={Common.title}>Modify avatar</p>
                    <div className={Style.changeAvatar}>
                        {cropper.enable ? (
                            <div className={Style.cropper}>
                                <Cropper
                                    className={loading ? 'blur' : ''}
                                    // @ts-ignore
                                    ref={$cropper}
                                    src={cropper.src}
                                    style={{
                                        width: 0,
                                        height: 0,
                                        paddingBottom: '50%',
                                    }}
                                    aspectRatio={1}
                                />
                                <Button
                                    className={Style.button}
                                    onClick={handleChangeAvatar}
                                >
                                    Modify avatar
                                </Button>
                                <ReactLoading
                                    className={`${Style.loading} ${
                                        loading ? 'show' : 'hide'
                                    }`}
                                    type="spinningBubbles"
                                    color={`rgb(${primaryColor}`}
                                    height={120}
                                    width={120}
                                />
                            </div>
                        ) : (
                            <div className={Style.preview}>
                                <img
                                    className={loading ? 'blur' : ''}
                                    alt="Avatar preview"
                                    src={getOSSFileUrl(avatar as string)}
                                    onClick={selectAvatar}
                                />
                                <ReactLoading
                                    className={`${Style.loading} ${
                                        loading ? 'show' : 'hide'
                                    }`}
                                    type="spinningBubbles"
                                    color={`rgb(${primaryColor}`}
                                    height={80}
                                    width={80}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>change Password</p>
                    <div>
                        <Input
                            className={Style.input}
                            value={oldPassword}
                            onChange={setOldPassword}
                            type="password"
                            placeholder="Old Password"
                        />
                        <Input
                            className={Style.input}
                            value={newPassword}
                            onChange={setNewPassword}
                            type="password"
                            placeholder="New Password"
                        />
                        <Button
                            className={Style.button}
                            onClick={handleChangePassword}
                        >
                            Confirm the changes
                        </Button>
                    </div>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>modify username</p>
                    <div>
                        <Input
                            className={Style.input}
                            value={username}
                            onChange={setUsername}
                            type="text"
                            placeholder="username"
                        />
                        <Button
                            className={Style.button}
                            onClick={handleChangeUsername}
                        >
                            Confirm the changes
                        </Button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default SelfInfo;

import React, { useEffect, useState } from 'react';

import { css } from 'linaria';
import Style from './Admin.less';
import Common from './Common.less';
import Dialog from '../../components/Dialog';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Message from '../../components/Message';
import {
    getSealList,
    resetUserPassword,
    sealUser,
    setUserTag,
    sealIp,
    toggleSendMessage,
    toggleNewUserSendMessage,
    getSystemConfig,
} from '../../service';

const styles = {
    button: css`
        min-width: 100px;
        height: 36px;
        margin-right: 12px;
        padding: 0 10px;
    `,
};

type SystemConfig = {
    disableSendMessage: boolean;
    disableNewUserSendMessage: boolean;
};

interface AdminProps {
    visible: boolean;
    onClose: () => void;
}

function Admin(props: AdminProps) {
    const { visible, onClose } = props;

    const [tagUsername, setTagUsername] = useState('');
    const [tag, setTag] = useState('');
    const [resetPasswordUsername, setResetPasswordUsername] = useState('');
    const [sealUsername, setSealUsername] = useState('');
    const [sealList, setSealList] = useState({ users: [], ips: [] });
    const [sealIpAddress, setSealIpAddress] = useState('');
    const [systemConfig, setSystemConfig] = useState<SystemConfig>();

    async function handleGetSealList() {
        const sealListRes = await getSealList();
        if (sealListRes) {
            setSealList(sealListRes);
        }
    }
    async function handleGetSystemConfig() {
        const systemConfigRes = await getSystemConfig();
        if (systemConfigRes) {
            setSystemConfig(systemConfigRes);
        }
    }
    useEffect(() => {
        if (visible) {
            handleGetSystemConfig();
            handleGetSealList();
        }
    }, [visible]);

    /**
     * 处理更新用户标签
     */
    async function handleSetTag() {
        const isSuccess = await setUserTag(tagUsername, tag.trim());
        if (isSuccess) {
            Message.success('The user label is updated successfully, please refresh the page to update the data');
            setTagUsername('');
            setTag('');
        }
    }

    /**
     * 处理重置用户密码操作
     */
    async function handleResetPassword() {
        const res = await resetUserPassword(resetPasswordUsername);
        if (res) {
            Message.success(`This user's password has been reset to:${res.newPassword}`);
            setResetPasswordUsername('');
        }
    }
    /**
     * 处理封禁用户操作
     */
    async function handleSeal() {
        const isSuccess = await sealUser(sealUsername);
        if (isSuccess) {
            Message.success('User banned successfully');
            setSealUsername('');
            handleGetSealList();
        }
    }

    async function handleSealIp() {
        const isSuccess = await sealIp(sealIpAddress);
        if (isSuccess) {
            Message.success('Successfully banned ip');
            setSealIpAddress('');
            handleGetSealList();
        }
    }

    async function handleDisableSendMessage() {
        const isSuccess = await toggleSendMessage(false);
        if (isSuccess) {
            Message.success('Successfully unbanned');
            handleGetSystemConfig();
        }
    }
    async function handleEnableSendMessage() {
        const isSuccess = await toggleSendMessage(true);
        if (isSuccess) {
            Message.success('Successfully closed ban');
            handleGetSystemConfig();
        }
    }

    async function handleDisableSNewUserendMessage() {
        const isSuccess = await toggleNewUserSendMessage(false);
        if (isSuccess) {
            Message.success('Enable new user ban successfully');
            handleGetSystemConfig();
        }
    }
    async function handleEnableNewUserSendMessage() {
        const isSuccess = await toggleNewUserSendMessage(true);
        if (isSuccess) {
            Message.success('Successfully close the ban on new users');
            handleGetSystemConfig();
        }
    }

    return (
        <Dialog
            className={Style.admin}
            visible={visible}
            title="administrator console"
            onClose={onClose}
        >
            <div className={Common.container}>
                <div className={Common.block}>
                    {!systemConfig?.disableSendMessage ? (
                        <Button
                            className={styles.button}
                            type="danger"
                            onClick={handleDisableSendMessage}
                        >
                            turnon mute
                        </Button>
                    ) : (
                        <Button
                            className={styles.button}
                            onClick={handleEnableSendMessage}
                        >
                            turn off mute
                        </Button>
                    )}
                    {!systemConfig?.disableNewUserSendMessage ? (
                        <Button
                            className={styles.button}
                            type="danger"
                            onClick={handleDisableSNewUserendMessage}
                        >
                            Enable new user ban
                        </Button>
                    ) : (
                        <Button
                            className={styles.button}
                            onClick={handleEnableNewUserSendMessage}
                        >
                            Close new user ban
                        </Button>
                    )}
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>update user label</p>
                    <div className={Style.inputBlock}>
                        <Input
                            className={`${Style.input} ${Style.tagUsernameInput}`}
                            value={tagUsername}
                            onChange={setTagUsername}
                            placeholder="Username to update label"
                        />
                        <Input
                            className={`${Style.input} ${Style.tagInput}`}
                            value={tag}
                            onChange={setTag}
                            placeholder="label content"
                        />
                        <Button className={Style.button} onClick={handleSetTag}>
                        Sure
                        </Button>
                    </div>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>reset user password</p>
                    <div className={Style.inputBlock}>
                        <Input
                            className={Style.input}
                            value={resetPasswordUsername}
                            onChange={setResetPasswordUsername}
                            placeholder="username to reset password"
                        />
                        <Button
                            className={Style.button}
                            onClick={handleResetPassword}
                        >
                            Sure
                        </Button>
                    </div>
                </div>

                <div className={Common.block}>
                    <p className={Common.title}>ban user</p>
                    <div className={Style.inputBlock}>
                        <Input
                            className={Style.input}
                            value={sealUsername}
                            onChange={setSealUsername}
                            placeholder="Username to ban"
                        />
                        <Button className={Style.button} onClick={handleSeal}>
                        Sure
                        </Button>
                    </div>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>Banned User List</p>
                    <div className={Style.sealList}>
                        {sealList.users.map((username) => (
                            <span className={Style.sealUsername} key={username}>
                                {username}
                            </span>
                        ))}
                    </div>
                </div>

                <div className={Common.block}>
                    <p className={Common.title}>ban ip</p>
                    <div className={Style.inputBlock}>
                        <Input
                            className={Style.input}
                            value={sealIpAddress}
                            onChange={setSealIpAddress}
                            placeholder="ip to be banned"
                        />
                        <Button className={Style.button} onClick={handleSealIp}>
                            Sure
                        </Button>
                    </div>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>Banned ip list</p>
                    <div className={Style.sealList}>
                        {sealList.ips.map((ip) => (
                            <span className={Style.sealUsername} key={ip}>
                                {ip}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default Admin;

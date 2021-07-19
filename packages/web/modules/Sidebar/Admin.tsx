import React, { useEffect, useState, useCallback } from 'react';

import Style from './Admin.less';
import Common from './Common.less';
import Dialog from '../../components/Dialog';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Message from '../../components/Message';
import { getSealList, resetUserPassword, sealUser, setUserTag, sealIp } from '../../service';

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

    /**
     * 获取被封禁的用户列表
     */
    const handleGetSealList = useCallback(async () => {
        const sealListRes = await getSealList();
        if (sealListRes) {
            setSealList(sealListRes);
        }
    }, []);

    useEffect(() => {
        if (visible) {
            handleGetSealList();
        }
    }, [handleGetSealList, visible]);

    /**
     * 处理更新用户标签
     */
    async function handleSetTag() {
        const isSuccess = await setUserTag(tagUsername, tag.trim());
        if (isSuccess) {
            Message.success('更新用户标签成功, 请刷新页面更新数据');
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
            Message.success(`已将该用户的密码重置为:${res.newPassword}`);
            setResetPasswordUsername('');
        }
    }
    /**
     * 处理封禁用户操作
     */
    async function handleSeal() {
        const isSuccess = await sealUser(sealUsername);
        if (isSuccess) {
            Message.success('封禁用户成功');
            setSealUsername('');
            handleGetSealList();
        }
    }

    async function handleSealIp() {
        const isSuccess = await sealIp(sealIpAddress);
        if (isSuccess) {
            Message.success('封禁ip成功');
            setSealIpAddress('');
            handleGetSealList();
        }
    }

    return (
        <Dialog className={Style.admin} visible={visible} title="管理员控制台" onClose={onClose}>
            <div className={Common.container}>
                <div className={Common.block}>
                    <p className={Common.title}>更新用户标签</p>
                    <div className={Style.inputBlock}>
                        <Input
                            className={`${Style.input} ${Style.tagUsernameInput}`}
                            value={tagUsername}
                            onChange={setTagUsername}
                            placeholder="要更新标签的用户名"
                        />
                        <Input
                            className={`${Style.input} ${Style.tagInput}`}
                            value={tag}
                            onChange={setTag}
                            placeholder="标签内容"
                        />
                        <Button className={Style.button} onClick={handleSetTag}>
                            确定
                        </Button>
                    </div>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>重置用户密码</p>
                    <div className={Style.inputBlock}>
                        <Input
                            className={Style.input}
                            value={resetPasswordUsername}
                            onChange={setResetPasswordUsername}
                            placeholder="要重置密码的用户名"
                        />
                        <Button className={Style.button} onClick={handleResetPassword}>
                            确定
                        </Button>
                    </div>
                </div>

                <div className={Common.block}>
                    <p className={Common.title}>封禁用户</p>
                    <div className={Style.inputBlock}>
                        <Input
                            className={Style.input}
                            value={sealUsername}
                            onChange={setSealUsername}
                            placeholder="要封禁的用户名"
                        />
                        <Button className={Style.button} onClick={handleSeal}>
                            确定
                        </Button>
                    </div>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>封禁用户列表</p>
                    <div className={Style.sealList}>
                        {sealList.users.map((username) => (
                            <span className={Style.sealUsername} key={username}>
                                {username}
                            </span>
                        ))}
                    </div>
                </div>

                <div className={Common.block}>
                    <p className={Common.title}>封禁ip</p>
                    <div className={Style.inputBlock}>
                        <Input
                            className={Style.input}
                            value={sealIpAddress}
                            onChange={setSealIpAddress}
                            placeholder="要封禁的ip"
                        />
                        <Button className={Style.button} onClick={handleSealIp}>
                            确定
                        </Button>
                    </div>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>封禁ip列表</p>
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

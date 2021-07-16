import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import getFriendId from '@fiora/utils/getFriendId';
import { getOSSFileUrl } from '../utils/uploadFile';
import Style from './InfoDialog.less';
import Dialog from '../components/Dialog';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import Message from '../components/Message';
import { State, Linkman } from '../state/reducer';
import useAction from '../hooks/useAction';
import {
    addFriend,
    getLinkmanHistoryMessages,
    deleteFriend,
    sealUser,
    getUserIps,
    sealUserOnlineIp,
} from '../service';

interface UserInfoProps {
    visible: boolean;
    user?: {
        _id: string;
        username: string;
        avatar: string;
        ip: string;
        isOnline?: string;
    };
    onClose: () => void;
}

function UserInfo(props: UserInfoProps) {
    const { visible, onClose, user } = props;

    const action = useAction();

    const selfId = useSelector((state: State) => state.user && state.user._id) || '';
    // 获取好友id
    if (user && user._id.length === selfId.length) {
        user._id = getFriendId(selfId, user._id);
    }
    /** 获取原始用户id */
    const originUserId = user && user._id.replace(selfId, '');

    // @ts-ignore
    const linkman = useSelector((state: State) => state.linkmans[user?._id]);
    const isFriend = linkman && linkman.type === 'friend';
    const isAdmin = useSelector((state: State) => state.user && state.user.isAdmin);
    const [largerAvatar, toggleLargetAvatar] = useState(false);

    const [userIps, setUserIps] = useState([]);

    useEffect(() => {
        if (isAdmin && user && user._id) {
            (async () => {
                const ips = await getUserIps(user._id.replace(selfId, ''));
                setUserIps(ips);
            })();
        }
    }, [isAdmin, selfId, user]);

    if (!user) {
        return null;
    }

    function handleFocusUser() {
        onClose();
        // @ts-ignore
        action.setFocus(user._id);
    }

    async function handleAddFriend() {
        // @ts-ignore
        const friend = await addFriend(originUserId);
        if (friend) {
            onClose();
            // @ts-ignore
            const { _id } = user;
            let existCount = 0;
            if (linkman) {
                existCount = Object.keys(linkman.messages).length;
                action.setLinkmanProperty(_id, 'type', 'friend');
            } else {
                const newLinkman = {
                    _id,
                    from: selfId,
                    to: {
                        _id: originUserId,
                        username: friend.username,
                        avatar: friend.avatar,
                    },
                    type: 'friend',
                    createTime: Date.now(),
                };
                action.addLinkman((newLinkman as unknown) as Linkman, true);
            }
            const messages = await getLinkmanHistoryMessages(_id, existCount);
            if (messages) {
                action.addLinkmanHistoryMessages(_id, messages);
            }
            handleFocusUser();
        }
    }

    async function handleDeleteFriend() {
        // @ts-ignore
        const isSuccess = await deleteFriend(originUserId);
        if (isSuccess) {
            onClose();
            // @ts-ignore
            action.removeLinkman(user._id);
            Message.success('删除好友成功');
        }
    }

    async function handleSeal() {
        // @ts-ignore
        const isSuccess = await sealUser(user.name || user.username);
        if (isSuccess) {
            Message.success('封禁用户成功');
        }
    }

    async function handleSealIp() {
        // @ts-ignore
        const isSuccess = await sealUserOnlineIp(originUserId);
        if (isSuccess) {
            Message.success('封禁ip成功');
        }
    }

    function searchIp(ip: string) {
        window.open(`https://www.baidu.com/s?wd=${ip}`);
    }

    function handleClose() {
        toggleLargetAvatar(false);
        onClose();
    }

    return (
        <Dialog className={Style.infoDialog} visible={visible} onClose={handleClose}>
            <div>
                {visible && user ? (
                    <div className={Style.coantainer}>
                        <div className={Style.header}>
                            <Avatar
                                size={60}
                                src={user.avatar}
                                onMouseEnter={() => toggleLargetAvatar(true)}
                                onMouseLeave={() => toggleLargetAvatar(false)}
                            />
                            <img
                                className={`${Style.largeAvatar} ${largerAvatar ? 'show' : 'hide'}`}
                                src={getOSSFileUrl(user.avatar)}
                                alt="用户头像"
                            />
                            <p>{user.username}</p>
                            <p className={Style.ip}>
                                {userIps.map((ip) => (
                                    <span key={ip} onClick={() => searchIp(ip)} role="button">
                                        {ip}
                                    </span>
                                ))}
                            </p>
                        </div>
                        <div className={Style.info}>
                            {isFriend ? <Button onClick={handleFocusUser}>发送消息</Button> : null}
                            {isFriend ? (
                                <Button type="danger" onClick={handleDeleteFriend}>
                                    删除好友
                                </Button>
                            ) : (
                                <Button onClick={handleAddFriend}>加为好友</Button>
                            )}
                            {isAdmin ? (
                                <Button type="danger" onClick={handleSeal}>
                                    封禁用户
                                </Button>
                            ) : null}
                            {isAdmin ? (
                                <Button type="danger" onClick={handleSealIp}>
                                    封禁ip
                                </Button>
                            ) : null}
                        </div>
                    </div>
                ) : null}
            </div>
        </Dialog>
    );
}

export default UserInfo;

import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import Dialog from '../components/Dialog';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import Message from '../components/Message';
import { State, Linkman } from '../state/reducer';
import getFriendId from '../../utils/getFriendId';
import useAction from '../hooks/useAction';
import { addFriend, getLinkmanHistoryMessages, deleteFriend, sealUser } from '../service';

import Style from './InfoDialog.less';

interface UserInfoProps {
    visible: boolean;
    user: {
        _id: string;
        username: string;
        avatar: string;
    };
    onClose: () => void;
}

function UserInfo(props: UserInfoProps) {
    const { visible, onClose, user } = props;
    if (!user) {
        return null;
    }

    const action = useAction();
    const selfId = useSelector((state: State) => state.user._id);
    const linkman = useSelector((state: State) => state.user.linkmans[user._id]);
    const isFriend = linkman && linkman.type === 'friend';
    const isAdmin = useSelector((state: State) => state.user.isAdmin);
    const [largerAvatar, toggleLargetAvatar] = useState(false);

    function handleFocusUser() {
        onClose();
        action.setFocus(getFriendId(user._id, selfId));
    }

    async function handleAddFriend() {
        const friend = await addFriend(user._id);
        if (friend) {
            onClose();
            const _id = getFriendId(selfId, friend._id);
            let existCount = 0;
            if (linkman) {
                existCount = Object.keys(linkman.messages).length;
                action.setFriend(_id);
            } else {
                const newLinkman = {
                    _id,
                    type: 'friend',
                    createTime: Date.now(),
                    avatar: friend.avatar,
                    username: friend.username,
                    messages: [],
                    unread: 0,
                    // @ts-ignore
                    from: friend.from,
                    // @ts-ignore
                    to: friend.to,
                };
                action.addLinkman(newLinkman as unknown as Linkman, true);
            }
            const messages = await getLinkmanHistoryMessages(_id, existCount);
            if (messages) {
                action.addLinkmanMessages(_id, messages);
            }
        }
    }

    async function handleDeleteFriend() {
        const isSuccess = await deleteFriend(user._id);
        if (isSuccess) {
            onClose();
            action.removeLinkman(getFriendId(selfId, user._id));
            Message.success('删除好友成功');
        }
    }

    async function handleSeal() {
        const isSuccess = await sealUser(user.username);
        if (isSuccess) {
            Message.success('封禁用户成功');
        }
    }

    return (
        <Dialog className={Style.infoDialog} visible={visible} onClose={onClose}>
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
                                src={user.avatar}
                                alt="用户头像"
                            />
                            <p>{user.username}</p>
                        </div>
                        <div className={Style.info}>
                            {isFriend ? (
                                <Button onClick={handleFocusUser}>发送消息</Button>
                            ) : null}
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
                        </div>
                    </div>
                ) : null}
            </div>
        </Dialog>
    );
}

export default UserInfo;

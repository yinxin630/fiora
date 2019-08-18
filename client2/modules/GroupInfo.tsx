import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Dialog from '../components/Dialog';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import { State } from '../state/reducer';
import useAction from '../hooks/useAction';
import { joinGroup, getLinkmanHistoryMessages } from '../service';

import Style from './InfoDialog.less';

interface GroupInfoProps {
    visible: boolean;
    group?: {
        _id: string;
        name: string;
        avatar: string;
        members: number;
    };
    onClose: () => void;
}

function GroupInfo(props: GroupInfoProps) {
    const { visible, onClose, group } = props;
    if (!group) {
        return null;
    }

    const action = useAction();
    const hasLinkman = useSelector((state: State) => !!state.user.linkmans[group._id]);
    const [largerAvatar, toggleLargetAvatar] = useState(false);

    async function handleJoinGroup() {
        onClose();
        const groupRes = await joinGroup(group._id);
        if (groupRes) {
            groupRes.type = 'group';
            action.addLinkman(groupRes, true);

            const messages = await getLinkmanHistoryMessages(group._id, 0);
            if (messages) {
                action.addLinkmanMessages(group._id, messages);
            }
        }
    }

    function handleFocusGroup() {
        onClose();
        action.setFocus(group._id);
    }

    return (
        <Dialog className={Style.groupInfo} visible={visible} onClose={onClose}>
            <div className={Style.coantainer}>
                <div className={Style.header}>
                    <Avatar
                        size={60}
                        src={group.avatar}
                        onMouseEnter={() => toggleLargetAvatar(true)}
                        onMouseLeave={() => toggleLargetAvatar(false)}
                    />
                    <img
                        className={`${Style.largeAvatar} ${largerAvatar ? 'show' : 'hide'}`}
                        src={group.avatar}
                        alt="用户头像"
                    />
                    <p>{group.name}</p>
                </div>
                <div className={Style.info}>
                    <div className={Style.onlineStatus}>
                        <p className={Style.onlineText}>成员:</p>
                        <div>{group.members}人</div>
                    </div>
                    {
                        hasLinkman
                            ? <Button onClick={handleFocusGroup}>发送消息</Button>
                            : <Button onClick={handleJoinGroup}>加入群组</Button>
                    }
                </div>
            </div>
        </Dialog>
    );
}

export default GroupInfo;

import React from 'react';

import Style from './InviteMessage.less';
import { joinGroup, getLinkmanHistoryMessages } from '../../../service';
import useAction from '../../../hooks/useAction';
import Message from '../../../components/Message';

interface InviteMessageProps {
    inviteInfo: string;
}

function InviteMessage(props: InviteMessageProps) {
    const { inviteInfo } = props;
    const invite = JSON.parse(inviteInfo);

    const action = useAction();

    async function handleJoinGroup() {
        const group = await joinGroup(invite.groupId);
        if (group) {
            group.type = 'group';
            action.addLinkman(group, true);
            Message.success('加入群组成功');
            const messages = await getLinkmanHistoryMessages(invite.groupId, 0);
            if (messages) {
                action.addLinkmanHistoryMessages(invite.groupId, messages);
            }
        }
    }

    return (
        <div className={Style.inviteMessage} onClick={handleJoinGroup} role="button">
            <div className={Style.info}>
                <span className={Style.info}>
                    &quot;{invite.inviter}&quot; 邀请你加入群组「{invite.groupName}」
                </span>
            </div>
            <p className={Style.join}>加入</p>
        </div>
    );
}

export default InviteMessage;

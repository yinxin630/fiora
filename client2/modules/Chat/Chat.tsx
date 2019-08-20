import React, { useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import HeaderBar from './HeaderBar';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import GroupManagePanel from './GroupManagePanel';
import { State } from '../../state/reducer';
import { ShowUserOrGroupInfoContext } from '../../context';

import Style from './Chat.less';

function Chat() {
    const focus = useSelector((state: State) => state.focus);
    const linkman = useSelector((state: State) => state.linkmans[focus]);
    const [groupManagePanel, toggleGroupManagePanel] = useState(false);
    const context = useContext(ShowUserOrGroupInfoContext);

    function handleBodyClick(e: MouseEvent) {
        const { currentTarget } = e;
        let target = e.target as HTMLDivElement;
        do {
            if (target.getAttribute('data-float-panel') === 'true') {
                return;
            }
            // @ts-ignore
            target = target.parentElement;
        } while (target && target !== currentTarget);
        toggleGroupManagePanel(false);
    }
    useEffect(() => {
        document.body.addEventListener('click', handleBodyClick, false);
        return () => {
            document.body.removeEventListener('click', handleBodyClick, false);
        };
    }, []);

    if (!linkman) {
        return <div className={Style.chat} />;
    }

    function handleClickFunction() {
        if (linkman.type === 'group') {
            toggleGroupManagePanel(true);
        } else {
            context.showUserDialog(linkman);
        }
    }

    return (
        <div className={Style.chat}>
            <HeaderBar
                name={linkman.name}
                type={linkman.type}
                onClickFunction={handleClickFunction}
            />
            <MessageList />
            <ChatInput />

            {linkman.type === 'group' && (
                <GroupManagePanel
                    visible={groupManagePanel}
                    onClose={() => toggleGroupManagePanel(false)}
                    groupId={linkman._id}
                    avatar={linkman.avatar}
                    creator={linkman.creator}
                    onlineMembers={linkman.onlineMembers}
                />
            )}
        </div>
    );
}

export default Chat;

import React, { useContext, useState } from 'react';
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

            <GroupManagePanel visible={groupManagePanel} />
        </div>
    );
}

export default Chat;

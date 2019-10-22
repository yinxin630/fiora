import React, { useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Style from './Chat.less';
import HeaderBar from './HeaderBar';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import GroupManagePanel from './GroupManagePanel';
import { State, GroupMember } from '../../state/reducer';
import { ShowUserOrGroupInfoContext } from '../../context';
import useIsLogin from '../../hooks/useIsLogin';
import { getGroupOnlineMembers, getDefaultGroupOnlineMembers } from '../../service';
import useAction from '../../hooks/useAction';
import useAero from '../../hooks/useAero';

function Chat() {
    const isLogin = useIsLogin();
    const action = useAction();
    const hasUserInfo = useSelector((state: State) => !!state.user);
    const focus = useSelector((state: State) => state.focus);
    const linkman = useSelector((state: State) => state.linkmans[focus]);
    const [groupManagePanel, toggleGroupManagePanel] = useState(false);
    const context = useContext(ShowUserOrGroupInfoContext);
    const aero = useAero();

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

    if (!hasUserInfo) {
        return <div className={Style.chat} />;
    }
    if (!linkman) {
        return (
            <div className={Style.chat}>
                <HeaderBar
                    name=""
                    type=""
                    onClickFunction={() => {}}
                />
                <div className={Style.noLinkman}>
                    <div className={Style.noLinkmanImage} />
                    <h2 className={Style.noLinkmanText}>找个群或者好友呀, 不然怎么聊天~~</h2>
                </div>
            </div>
        );
    }

    async function handleClickFunction() {
        let onlineMembers: GroupMember[] = [];
        if (linkman.type === 'group') {
            if (isLogin) {
                onlineMembers = await getGroupOnlineMembers(focus);
            } else {
                onlineMembers = await getDefaultGroupOnlineMembers();
            }
            action.setLinkmanProperty(focus, 'onlineMembers', onlineMembers);
            toggleGroupManagePanel(true);
        } else {
            context.showUserInfo(linkman);
        }
    }

    return (
        <div className={Style.chat} {...aero}>
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

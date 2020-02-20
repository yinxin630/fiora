import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

import { State, Message } from '../../state/reducer';
import useIsLogin from '../../hooks/useIsLogin';
import useAction from '../../hooks/useAction';
import { getLinkmanHistoryMessages, getDefaultGroupHistoryMessages } from '../../service';
import MessageComponent from './Message/Message';

import Style from './MessageList.less';

function MessageList() {
    const action = useAction();
    const selfId = useSelector((state: State) => state.user._id);
    const focus = useSelector((state: State) => state.focus);
    const isGroup = useSelector((state: State) => state.linkmans[focus].type === 'group');
    const creator = useSelector((state: State) => state.linkmans[focus].creator);
    const messages = useSelector((state: State) => state.linkmans[focus].messages);
    const isLogin = useIsLogin();
    const tagColorMode = useSelector((state: State) => state.status.tagColorMode);

    const $list = useRef(null);

    let isFetching = false;
    async function handleScroll(e) {
        // Don't know why the code-view dialog will also trigger when scrolling
        if ($list.current && e.target !== $list.current) {
            return;
        }
        if (isFetching) {
            return;
        }

        const $div = e.target;
        if ($div.scrollTop === 0 && $div.scrollHeight > $div.clientHeight) {
            isFetching = true;
            let historyMessages: Message[] = [];
            if (isLogin) {
                historyMessages = await getLinkmanHistoryMessages(
                    focus,
                    Object.keys(messages).length,
                );
            } else {
                historyMessages = await getDefaultGroupHistoryMessages(
                    Object.keys(messages).length,
                );
            }
            if (historyMessages && historyMessages.length > 0) {
                action.addLinkmanHistoryMessages(focus, historyMessages);
            }
            isFetching = false;
        }
    }

    function renderMessage(message: Message) {
        const isSelf = message.from._id === selfId;
        let shouldScroll = true;
        if ($list.current) {
            const { scrollHeight, clientHeight, scrollTop } = $list.current;
            shouldScroll = isSelf
                || scrollHeight === clientHeight
                || scrollTop === 0
                || scrollTop > scrollHeight - clientHeight * 2;
        }

        let { tag } = message.from;
        if (!tag && isGroup && message.from._id === creator) {
            tag = '群主';
        }

        return (
            <MessageComponent
                key={message._id}
                id={message._id}
                linkmanId={focus}
                isSelf={isSelf}
                userId={message.from._id}
                avatar={message.from.avatar}
                username={message.from.username}
                originUsername={message.from.originUsername}
                time={message.createTime}
                type={message.type}
                content={message.content}
                tag={tag}
                loading={message.loading}
                percent={message.percent}
                shouldScroll={shouldScroll}
                tagColorMode={tagColorMode}
            />
        );
    }

    return (
        <div className={`${Style.messageList} show-scrollbar`} onScroll={handleScroll} ref={$list}>
            {Object.values(messages).map((message) => renderMessage(message))}
        </div>
    );
}

export default MessageList;

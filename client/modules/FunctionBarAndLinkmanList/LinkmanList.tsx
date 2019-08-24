import React from 'react';
import { useSelector } from 'react-redux';

import { Linkman, State } from '../../state/reducer';
import LinkmanComponent from './Linkman';

import Style from './LinkmanList.less';

function LinkmanList() {
    const linkmans = useSelector((state: State) => state.linkmans);

    function renderLinkman(linkman: Linkman) {
        const messages = Object.values(linkman.messages);
        const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;

        let time = new Date(linkman.createTime);
        let preview = '暂无消息';
        if (lastMessage) {
            time = new Date(lastMessage.createTime);
            const { type } = lastMessage;
            preview = type === 'text' ? `${lastMessage.content}` : `[${type}]`;
            if (linkman.type === 'group') {
                preview = `${lastMessage.from.username}: ${preview}`;
            }
        }
        return (
            <LinkmanComponent
                key={linkman._id}
                id={linkman._id}
                name={linkman.name}
                avatar={linkman.avatar}
                preview={preview}
                time={time}
                unread={linkman.unread}
            />
        );
    }

    return (
        <div className={Style.linkmanList}>
            { Object.values(linkmans).map((linkman) => renderLinkman(linkman)) }
        </div>
    );
}

export default LinkmanList;

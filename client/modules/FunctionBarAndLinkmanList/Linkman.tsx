import React from 'react';
import { useSelector } from 'react-redux';

import Avatar from '../../components/Avatar';
import Time from '../../../utils/time';
import { State } from '../../state/reducer';
import useAction from '../../hooks/useAction';
import { isMobile } from '../../../utils/ua';

import Style from './Linkman.less';
import useAero from '../../hooks/useAero';
import { useFocusLinkman, useSelfId } from '../../hooks/useStore';
import { updateHistory } from '../../service';

interface LinkmanProps {
    id: string;
    name: string;
    avatar: string;
    /** 消息预览 */
    preview: string;
    unread: number;
    time: Date;
}

function Linkman(props: LinkmanProps) {
    const { id, name, avatar, preview, unread, time } = props;

    const action = useAction();
    const focus = useSelector((state: State) => state.focus);
    const aero = useAero();
    const focusLinkman = useFocusLinkman();
    const self = useSelfId();

    function formatTime() {
        const nowTime = new Date();
        if (Time.isToday(nowTime, time)) {
            return Time.getHourMinute(time);
        }
        if (Time.isYesterday(nowTime, time)) {
            return '昨天';
        }
        return Time.getMonthDate(time);
    }

    async function handleClick() {
        if (focusLinkman) {
            const messageKeys = Object.keys(focusLinkman.messages);
            if (messageKeys.length > 0) {
                const lastMessageId =
                    focusLinkman.messages[messageKeys[messageKeys.length - 1]]._id;
                updateHistory(self, focusLinkman._id, lastMessageId);
            }
        }

        action.setFocus(id);
        if (isMobile) {
            action.setStatus('functionBarAndLinkmanListVisible', false);
        }
    }

    return (
        <div
            className={`${Style.linkman} ${id === focus ? Style.focus : ''}`}
            onClick={handleClick}
            role="button"
            {...aero}
        >
            <Avatar src={avatar} size={48} />
            <div className={Style.container}>
                <div className={`${Style.rowContainer} ${Style.nameTimeBlock}`}>
                    <p className={Style.name}>{name}</p>
                    <p className={Style.time}>{formatTime()}</p>
                </div>
                <div className={`${Style.rowContainer} ${Style.previewUnreadBlock}`}>
                    <p
                        className={Style.preview}
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: preview }}
                    />
                    {unread > 0 && id !== focus && (
                        <div className={Style.unread}>
                            <span>{unread > 99 ? '99+' : unread}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Linkman;

import React, { useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../state/reducer';
import Avatar from '../../../components/Avatar';
import Time from '../../../../utils/time';
import TextMessage from './TextMessage';
import { ShowUserOrGroupInfoContext } from '../../../context';

import Style from './Message.less';
import ImageMessage from './ImageMessage';
import CodeMessage from './CodeMessage';
import UrlMessage from './UrlMessage';
import InviteMessage from './InviteMessage';
import SystemMessage from './SystemMessage';

interface MessageProps {
    userId: string;
    avatar: string;
    username: string;
    originUsername: string;
    tag: string;
    time: Date;
    type: string;
    content: string;
    loading: boolean;
    percent: number;
    shouldScroll: boolean;
}

function Message(props: MessageProps) {
    const {
        userId,
        type,
        content,
        avatar,
        tag,
        username,
        originUsername,
        time,
        loading,
        percent,
        shouldScroll,
    } = props;

    const isSelf = useSelector((state: State) => state.user._id === userId);
    const context = useContext(ShowUserOrGroupInfoContext);
    const $container = useRef(null);

    useEffect(() => {
        if (shouldScroll) {
            $container.current.scrollIntoView();
        }
    }, []);

    function formatTime() {
        const nowTime = new Date();
        if (Time.isToday(nowTime, time)) {
            return Time.getHourMinute(time);
        }
        if (Time.isYesterday(nowTime, time)) {
            return `昨天 ${Time.getHourMinute(time)}`;
        }
        return `${Time.getMonthDate(time)} ${Time.getHourMinute(time)}`;
    }

    function handleClickAvatar() {
        if (!isSelf && type !== 'system') {
            context.showUserInfo({
                _id: userId,
                username,
                avatar,
            });
        }
    }

    function renderContent() {
        switch (type) {
            case 'text': {
                return <TextMessage content={content} />;
            }
            case 'image': {
                return <ImageMessage src={content} loading={loading} percent={percent} />;
            }
            case 'code': {
                return <CodeMessage code={content} />;
            }
            case 'url': {
                return <UrlMessage url={content} />;
            }
            case 'invite': {
                return <InviteMessage inviteInfo={content} />;
            }
            case 'system': {
                return <SystemMessage message={content} username={originUsername} />;
            }
            default:
                return <div className="unknown">不支持的消息类型</div>;
        }
    }

    return (
        <div className={`${Style.message} ${isSelf ? Style.self : ''}`} ref={$container}>
            <Avatar className={Style.avatar} src={avatar} size={44} onClick={handleClickAvatar} />
            <div className={Style.right}>
                <div className={Style.nicknameTimeBlock}>
                    <span className={Style.tag} style={{ display: tag ? 'inline-block' : 'none' }}>
                        {tag}
                    </span>
                    <span className={Style.nickname}>{username}</span>
                    <span className={Style.time}>{formatTime()}</span>
                </div>
                <div className={Style.content}>{renderContent()}</div>
                <div className={Style.arrow} />
            </div>
        </div>
    );
}

export default Message;

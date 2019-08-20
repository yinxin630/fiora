import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../state/reducer';
import Avatar from '../../../components/Avatar';
import Time from '../../../../utils/time';
import TextMessage from './TextMessage';
import { ShowUserOrGroupInfoContext } from '../../../context';

import Style from './Message.less';

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
    const { userId, type, content, avatar, tag, username, time } = props;

    const isSelf = useSelector((state: State) => state.user._id === userId);
    const context = useContext(ShowUserOrGroupInfoContext);

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
                return <TextMessage content={content} />;
            }
            case 'code': {
                return <TextMessage content={content} />;
            }
            case 'url': {
                return <TextMessage content={content} />;
            }
            case 'invite': {
                return <TextMessage content={content} />;
            }
            case 'system': {
                return <TextMessage content={content} />;
            }
            default:
                return <div className="unknown">不支持的消息类型</div>;
        }
    }

    return (
        <div
            className={`${Style.message} ${isSelf ? Style.self : ''}`}
        >
            <Avatar
                className={Style.avatar}
                src={avatar}
                size={44}
                onClick={handleClickAvatar}
            />
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

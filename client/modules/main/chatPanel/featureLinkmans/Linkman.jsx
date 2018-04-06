import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Avatar from '@/components/Avatar';

class Linkman extends Component {
    static propTypes = {
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        preview: PropTypes.string,
        time: PropTypes.object,
        unread: PropTypes.number.isRequired,
        focus: PropTypes.bool,
        onClick: PropTypes.func,
    }
    static getZeroTime(time) {
        const result = new Date(time);
        result.setHours(0);
        result.setMinutes(0);
        result.setSeconds(0);
        result.setMilliseconds(0);
        return result;
    }
    shouldComponentUpdate(nextProps) {
        return !(
            this.props.avatar === nextProps.avatar &&
            this.props.name === nextProps.name &&
            this.props.preview === nextProps.preview &&
            this.props.time === nextProps.time &&
            this.props.unread === nextProps.unread &&
            this.props.focus === nextProps.focus
        );
    }
    formatTime() {
        const { time: messageTime } = this.props;
        const nowTime = new Date();
        const zeroMessageTime = Linkman.getZeroTime(messageTime);
        const zeroNowTime = Linkman.getZeroTime(nowTime);
        if (zeroMessageTime.getTime() === zeroNowTime.getTime()) {
            return `${messageTime.getHours()}:${messageTime.getMinutes()}`;
        }
        zeroNowTime.setDate(zeroNowTime.getDate() - 1);
        if (zeroMessageTime.getTime() === zeroNowTime.getTime()) {
            return '昨天';
        }
        zeroNowTime.setDate(zeroNowTime.getDate() - 1);
        if (zeroMessageTime.getTime() === zeroNowTime.getTime()) {
            return '前天';
        }
        return `${messageTime.getMonth()}/${messageTime.getDate()}`;
    }
    render() {
        const {
            avatar, name, preview, unread, focus, onClick,
        } = this.props;
        return (
            <div className={`module-main-feature-linkman ${focus ? 'focus' : ''}`} onClick={onClick}>
                <Avatar src={avatar} size={48} />
                <div className="top-bottom">
                    <div className="name-time">
                        <p className="name">{name}</p>
                        <p className="time">{this.formatTime()}</p>
                    </div>
                    <div className="preview-unread">
                        <p className="preview">{preview}</p>
                        {
                            unread > 0 ? <div className="unread"><span>{unread}</span></div> : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Linkman;

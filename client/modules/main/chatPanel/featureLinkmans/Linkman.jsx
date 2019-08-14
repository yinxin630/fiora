import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Time from '../../../../../utils/time';
import Avatar from '../../../../components/Avatar';

class Linkman extends Component {
    static propTypes = {
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        preview: PropTypes.string.isRequired,
        // eslint-disable-next-line react/forbid-prop-types
        time: PropTypes.object.isRequired,
        unread: PropTypes.number.isRequired,
        focus: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
    }

    shouldComponentUpdate(nextProps) {
        const {
            avatar, name, preview, unread, focus,
        } = this.props;
        return !(
            avatar === nextProps.avatar
            && name === nextProps.name
            && preview === nextProps.preview
            && unread === nextProps.unread
            && focus === nextProps.focus
        );
    }

    static getZeroTime(time) {
        const result = new Date(time);
        result.setHours(0);
        result.setMinutes(0);
        result.setSeconds(0);
        result.setMilliseconds(0);
        return result;
    }

    formatTime() {
        const { time: messageTime } = this.props;
        const nowTime = new Date();
        if (Time.isToday(nowTime, messageTime)) {
            return Time.getHourMinute(messageTime);
        }
        if (Time.isYesterday(nowTime, messageTime)) {
            return '昨天';
        }
        return Time.getMonthDate(messageTime);
    }

    render() {
        const {
            avatar, name, preview, unread, focus, onClick,
        } = this.props;
        return (
            <div className={`module-main-feature-linkman ${focus ? 'focus' : ''}`} onClick={onClick} role="button">
                <Avatar src={avatar} size={48} />
                <div className="top-bottom">
                    <div className="name-time">
                        <p className="name">{name}</p>
                        <p className="time">{this.formatTime()}</p>
                    </div>
                    <div className="preview-unread">
                        <p
                            className="preview"
                            // eslint-disable-next-line react/no-danger
                            dangerouslySetInnerHTML={{ __html: preview }}
                        />
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

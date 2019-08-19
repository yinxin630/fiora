import React from 'react';
import Notification from 'rc-notification';

import 'rc-notification/dist/rc-notification.min.css';
import Style from './Message.less';

function showMessage(text: string, duration = 1.5, type = 'success') {
    Notification.newInstance({}, (notification) => {
        notification.notice({
            content: (
                <div className={Style.componentMessage}>
                    <i className={`iconfont icon-${type}`} />
                    <span className={Style.messageText}>{text}</span>
                </div>
            ),
            duration,
        });
    });
}

export default {
    success(text: string, duration = 1.5) {
        showMessage(text, duration, 'success');
    },
    error(text: string, duration = 1.5) {
        showMessage(text, duration, 'error');
    },
    warning(text: string, duration = 1.5) {
        showMessage(text, duration, 'warning');
    },
    info(text: string, duration = 1.5) {
        showMessage(text, duration, 'info');
    },
};

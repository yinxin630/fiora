import React from 'react';
import Notification from 'rc-notification';

import 'rc-notification/assets/index.css';

function showMessage(text: string, duration = 1.5, type = 'success') {
    Notification.newInstance({}, (notification) => {
        notification.notice({
            content: (
                <div className="component-message">
                    <i className={`iconfont icon-${type}`} />
                    <span>{text}</span>
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

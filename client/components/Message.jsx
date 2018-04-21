import React from 'react';
import Notification from 'rc-notification';

import 'rc-notification/assets/index.css';
import './components.less';

function showMessage(text, duration = 1.5, type = 'success') {
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
    success(text, duration) {
        showMessage(text, duration, 'success');
    },
    error(text, duration) {
        showMessage(text, duration, 'error');
    },
    warning(text, duration) {
        showMessage(text, duration, 'warning');
    },
    info(text, duration) {
        showMessage(text, duration, 'info');
    },
};


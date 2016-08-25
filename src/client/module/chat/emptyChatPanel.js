import React from 'react';
import './style/emptyChatPanel.scss';

import pureRenderMixin from 'react-addons-pure-render-mixin';

class EmptyChatPanel extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render () {
        return (
            <div className="empty-chat-panel">

            </div>
        );
    }
}

export default EmptyChatPanel;
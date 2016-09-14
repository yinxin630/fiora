import React from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './emptyChatPanel.scss';


class EmptyChatPanel extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div className="empty-chat-panel" />
        );
    }
}

export default EmptyChatPanel;

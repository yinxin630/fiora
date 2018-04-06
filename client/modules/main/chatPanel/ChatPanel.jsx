import React, { Component } from 'react';

import FeatureLinkmans from './featureLinkmans/FeatureLinkmans';
import Chat from './chat/Chat';
import './ChatPanel.less';

class ChatPanel extends Component {
    render() {
        return (
            <div className="module-main-chatPanel">
                <FeatureLinkmans />
                <Chat />
            </div>
        );
    }
}

export default ChatPanel;

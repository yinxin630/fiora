import React from 'react';
import { useSelector } from 'react-redux';

import FeatureLinkmans from './featureLinkmans/FeatureLinkmans';
import Chat from './chat/Chat';
import './ChatPanel.less';

function ChatPanel() {
    const featurePanelVisible = useSelector((state) => state.getIn(['ui', 'featurePanelVisible']));

    return (
        <div className="module-main-chatPanel">
            { featurePanelVisible && <FeatureLinkmans /> }
            <Chat />
        </div>
    );
}

export default ChatPanel;

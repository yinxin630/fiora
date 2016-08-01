import React from 'react';
import '../style/chatPanelHeader.scss';

class ChatPanelHeader extends React.Component {
    render () {
        return (
            <div className="chat-panel-header">
                <div>
                    <img src={ require('../image/avatar.gif') }/>
                    <p>碎碎酱</p>
                </div>
                <div>
                    <div>
                        <i className="icon">&#xe60a;</i>
                    </div>
                    <div>
                        <i className="icon">&#xe609;</i>
                    </div>
                    <div>
                        <i className="icon">&#xe601;</i>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatPanelHeader;
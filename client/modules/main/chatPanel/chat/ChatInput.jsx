import React, { Component } from 'react';

import IconButton from '@/components/IconButton';

class ChatInput extends Component {
    render() {
        return (
            <div className="chat-chatInput">
                <IconButton className="expression" width={44} height={44} icon="expression" iconSize={32} />
                <IconButton className="feature" width={44} height={44} icon="feature" iconSize={32} />
                <input />
                <IconButton className="send" width={44} height={44} icon="send" iconSize={32} />
            </div>
        );
    }
}

export default ChatInput;

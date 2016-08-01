import React from 'react';
import '../style/chatPanel.scss';

import MessageList from './messageList';
import Toolbar from './toolbar';
import ChatPanelHeader from './chatPanelHeader';
import InputBox from './inputBox';

class ChatPanel extends React.Component {
    render () {
        return (
            <div className="chat-panel">
                <ChatPanelHeader/>
                <MessageList.container>
                    <MessageList.item self/>
                    <MessageList.item/>
                    <MessageList.item/>
                    <MessageList.item/>
                    <MessageList.item/>
                    <MessageList.item/>
                    <MessageList.item/>
                    <MessageList.item/>
                    <MessageList.item/>
                </MessageList.container>
                <InputBox/>
                <Toolbar/>

                <div className="float-panel">
                    <div>
                        <span>群设置</span>
                        <i className="icon">&#xe603;</i>
                    </div>
                    <div className="group-info">
                        <div>
                            <span>群名称：</span>
                            <span>Fiora</span>
                            <span>{ '< 修改' }</span>
                        </div>
                        <div>
                            <span>群主：</span>
                            <span>碎碎酱</span>
                        </div>
                        <div>
                            <span>群成员：</span>
                            <span>3人</span>
                        </div>
                        <div className="userList">
                            <div>
                                <img src={ require('../image/avatar.gif') }/>
                                <span>碎碎酱</span>
                            </div>
                            <div>
                                <img src={ require('../image/avatar.gif') }/>
                                <span>碎碎酱</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatPanel;
import React from 'react';
import '../style/body.scss';

import UserList from './userList';
import MessageList from './messageList';
import Toolbar from './toolbar';
import ChatPanelHeader from './chatPanelHeader';

class Body extends React.Component {
    render () {
        return (
            <div className="body">
                <UserList.container>
                    <UserList.item/>
                    <UserList.item/>
                </UserList.container>
                <div className="chatPanel">
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
                    <div className="input">
                        <input type="text" autofocus/>
                    </div>
                    <Toolbar/>
                </div>
            </div>
        );
    }
}

export default Body;
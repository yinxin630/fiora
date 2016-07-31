import React from 'react';
import '../style/body.scss';

import UserList from './userList';
import MessageList from './messageList';

class Body extends React.Component {
    render () {
        return (
            <div className="body">
                <UserList.container>
                    <UserList.item/>
                    <UserList.item/>
                </UserList.container>
                <div className="chatPanel">
                    <div className="header">
                        <div>
                            <img src={ require('../image/avatar.gif') }/>
                            <p>碎碎酱</p>
                        </div>
                        <div>
                            <div>
                                <i className="icon">&#xe603;</i>
                            </div>
                            <div>
                                <i className="icon">&#xe603;</i>
                            </div>
                            <div>
                                <i className="icon">&#xe603;</i>
                            </div>
                        </div>
                    </div>
                    <MessageList.container>
                        <MessageList.item self/>
                        <MessageList.item/>
                        <MessageList.item/>
                    </MessageList.container>
                    <div className="input">
                        <input type="text" autofocus/>
                    </div>
                    <div className="toolbar">
                        <div>
                            <i className="icon">&#xe603;</i>
                        </div>
                        <div>
                            <i className="icon">&#xe603;</i>
                        </div>
                        <div>
                            <i className="icon">&#xe603;</i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Body;
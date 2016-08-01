import React from 'react';
import '../style/body.scss';

import UserList from './userList';
import ChatPanel from './chatPanel';

class Body extends React.Component {
    render () {
        return (
            <div className="body">
                <UserList.container>
                    <UserList.item/>
                    <UserList.item/>
                </UserList.container>
                <ChatPanel/>
            </div>
        );
    }
}

export default Body;
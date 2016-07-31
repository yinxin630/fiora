import React from 'react';
import '../style/body.scss';

import UserList from './userList';

class Body extends React.Component {
    render () {
        return (
            <div className="body">
                <UserList.container>
                    <UserList.item/>
                    <UserList.item/>
                </UserList.container>
                <div className="right"></div>
            </div>
        );
    }
}

export default Body;
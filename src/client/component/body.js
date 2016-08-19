import React from 'react';
import '../style/body.scss';

import { connect } from 'react-redux';

import UserList from './userList';
import ChatPanel from './chatPanel';

class Body extends React.Component {
    render () {
        const { groups } = this.props;
        const userListItems = [];
        for (let group of groups) {
            group.itemType = 'group';
            userListItems.push(group);
        }

        return (
            <div className="body">
                <UserList.container>
                {
                    userListItems.map(item => (
                        <UserList.item
                            key={item.type + item._id}
                            data={item}
                        />
                    ))
                }
                </UserList.container>
                <ChatPanel/>
            </div>
        );
    }
}

export default connect(
    state => ({
        groups: state.user.groups
    })
)(Body);
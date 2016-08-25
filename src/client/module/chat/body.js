import React from 'react';
import './style/body.scss';

import { connect } from 'react-redux';

import UserList from './userList';
import ChatPanel from './chatPanel';
import EmptyChatPanel from './emptyChatPanel';

class Body extends React.Component {
    render() {
        const { linkmans, me, location, routeParams } = this.props;

        return (
            <div className="body">
                <UserList.container>
                    {
                        linkmans.map(item => (
                            <UserList.item
                                key={item.type + item._id}
                                data={item}
                                />
                        ))
                    }
                </UserList.container>
                {
                    location.pathname === '/chat' ?
                        <EmptyChatPanel/>
                        :
                        <ChatPanel
                            data={linkmans.filter(x => x.type === routeParams.type && x._id === routeParams.id)[0]}
                            me={me}
                            />
                }
            </div>
        );
    }
}

export default connect(
    state => ({
        linkmans: state.getIn(['user', 'linkmans']).toJS(),
        me: state.getIn(['user', '_id'])
    })
)(Body);
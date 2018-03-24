import React, { Component } from 'react';

import Avatar from '@/components/Avatar';
import IconButton from '@/components/IconButton';
import '@/styles/sidebar.less';

import SingleCheckGroup from './SingleCheckGroup';
import SingleCheckButton from './SingleCheckButton';
import OnlineStatus from './OnlineStatus';

class Sidebar extends Component {
    render() {
        return (
            <div className="module-main-sidebar">
                <Avatar className="avatar" src={require('@/assets/images/头像1.png')} />
                <OnlineStatus className="status" status="online" />
                <SingleCheckGroup className="tabs" defaultFocus="chat">
                    <SingleCheckButton key="chat" icon="chat" />
                    <SingleCheckButton key="friends" icon="friends" />
                    <SingleCheckButton key="groups" icon="groups" />
                </SingleCheckGroup>
                <IconButton width={40} height={40} icon="logout" iconSize={30} />
            </div>
        );
    }
}

export default Sidebar;

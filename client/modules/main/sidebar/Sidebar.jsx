import React, { Component } from 'react';

import Avatar from '@/components/Avatar';
import IconButton from '@/components/IconButton';

import SingleCheckGroup from './SingleCheckGroup';
import SingleCheckButton from './SingleCheckButton';
import OnlineStatus from './OnlineStatus';
import './Sidebar.less';

class Sidebar extends Component {
    render() {
        return (
            <div className="module-main-sidebar">
                <Avatar className="avatar" src={require('@/assets/images/头像1.png')} />
                <OnlineStatus className="status" status="offline" />
                <SingleCheckGroup className="tabs" defaultFocus="chat">
                    <SingleCheckButton key="chat" icon="chat" />
                    <SingleCheckButton key="friends" icon="friends" />
                    <SingleCheckButton key="groups" icon="groups" />
                </SingleCheckGroup>
                <div className="buttons">
                    <IconButton width={40} height={40} icon="setting" iconSize={26} />
                    <IconButton width={40} height={40} icon="logout" iconSize={26} />
                </div>
            </div>
        );
    }
}

export default Sidebar;

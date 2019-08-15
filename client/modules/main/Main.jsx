import React from 'react';
import { useSelector } from 'react-redux';

import Sidebar from './sidebar/Sidebar';
import ChatPanel from './chatPanel/ChatPanel';
import './Main.less';

function Main() {
    const sideInfoVisible = useSelector((state) => state.getIn(['ui', 'sideInfoVisible']));

    return (
        <div className="module-main">
            { sideInfoVisible && <Sidebar /> }
            <ChatPanel />
        </div>
    );
}

export default Main;

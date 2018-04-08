import React, { Component } from 'react';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';

import Sidebar from './sidebar/Sidebar';
import ChatPanel from './chatPanel/ChatPanel';
import './Main.less';

@immutableRenderDecorator
class Main extends Component {
    render() {
        return (
            <div className="module-main">
                <Sidebar />
                <ChatPanel />
            </div>
        );
    }
}

export default Main;

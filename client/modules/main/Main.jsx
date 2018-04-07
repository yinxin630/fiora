import React, { Component } from 'react';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';

import Dialog from '@/components/Dialog';
import Sidebar from './sidebar/Sidebar';
import ChatPanel from './chatPanel/ChatPanel';
import Login from './login/Login';
import './Main.less';

@immutableRenderDecorator
class Main extends Component {
    render() {
        return (
            <div className="module-main">
                <Sidebar />
                <ChatPanel />
                <Dialog visible={false} closable={false}>
                    <Login />
                </Dialog>
            </div>
        );
    }
}

export default Main;

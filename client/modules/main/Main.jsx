import React, { Component } from 'react';

import '@/styles/main.less';
import Sidebar from './sidebar/Sidebar';

class Main extends Component {
    render() {
        return (
            <div className="module-main">
                <Sidebar />
            </div>
        );
    }
}

export default Main;

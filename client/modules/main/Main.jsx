import React, { Component } from 'react';

import '@/styles/main.less';
import Sidebar from './sidebar/Sidebar';
import Feature from './feature/Feature';

class Main extends Component {
    render() {
        return (
            <div className="module-main">
                <Sidebar />
                <Feature />
            </div>
        );
    }
}

export default Main;

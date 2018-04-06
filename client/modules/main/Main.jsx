import React, { Component } from 'react';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';

import '@/styles/main.less';
import Sidebar from './sidebar/Sidebar';
import Feature from './feature/Feature';

@immutableRenderDecorator
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

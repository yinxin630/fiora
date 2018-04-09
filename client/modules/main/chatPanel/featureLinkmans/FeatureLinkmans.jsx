import React, { Component } from 'react';

import LinkmanGroup from './LinkmanGroup';
import Feature from './Feature';
import './FeatureLinkmans.less';

class FeatureLinkmans extends Component {
    render() {
        return (
            <div className="module-main-feature">
                <Feature />
                <LinkmanGroup />
            </div>
        );
    }
}

export default FeatureLinkmans;

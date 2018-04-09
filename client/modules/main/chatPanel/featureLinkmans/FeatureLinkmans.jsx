import React, { Component } from 'react';

import LinkmanGroup from './LinkmanGroup';
import './FeatureLinkmans.less';

class FeatureLinkmans extends Component {
    render() {
        return (
            <div className="module-main-feature">
                <LinkmanGroup />
            </div>
        );
    }
}

export default FeatureLinkmans;

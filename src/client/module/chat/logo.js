import React from 'react';
import './style/logo.scss';

import pureRenderMixin from 'react-addons-pure-render-mixin';

class Logo extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render () {
        return (
            <div className="logo">
                <img src={ require('../../image/logo.png') }/>
            </div>
        );
    }
}

export default Logo;
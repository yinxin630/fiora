import React from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './style/logo.scss';


class Logo extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div className="logo">
                <img src={require('../../image/logo.png')} />
            </div>
        );
    }
}

export default Logo;

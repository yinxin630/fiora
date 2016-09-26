import React from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './header.scss';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div className="linkman-header">
                <img src="http://assets.suisuijiang.com/logo.png" />
            </div>
        );
    }
}

export default Header;

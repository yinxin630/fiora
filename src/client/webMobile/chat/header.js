import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './header.scss';

class Header extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const { name } = this.props;

        return (
            <div className="header">
                <span>{ name }</span>
            </div>
        );
    }
}

export default Header;

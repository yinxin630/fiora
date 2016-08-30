import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './style/navList.scss';

class NavList extends React.Component {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.object),
    };
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <nav className="nav-list">
                { this.props.children }
            </nav>
        );
    }
}

class Nav extends React.Component {
    static propTypes = {
        icon: PropTypes.string.isRequired,
        selected: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const { icon, selected } = this.props;
        return (
            <div className={`nav-list-item ${selected ? 'selected' : ''}`}>
                <i className="icon">{ icon }</i>
            </div>
        );
    }
}

export default {
    container: NavList,
    item: Nav,
};

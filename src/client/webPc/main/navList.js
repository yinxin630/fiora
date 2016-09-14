import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './navList.scss';

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
        selected: PropTypes.bool,
        onClick: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const { icon, selected, onClick } = this.props;
        return (
            <div
                className={`nav-list-item ${selected ? 'selected' : ''}`}
                onClick={onClick}
            >
                <i className="icon">{ icon }</i>
            </div>
        );
    }
}

export default {
    container: NavList,
    item: Nav,
};

import React from 'react';
import './style/navList.scss';

import pureRenderMixin from 'react-addons-pure-render-mixin';

class NavList extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }
    
    render () {
        return (
                <nav className="nav-list">
                    { this.props.children }
                </nav>
        );
    }
}

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render () {
        let { icon, selected } = this.props;
        return (
            <div className={ `nav-list-item ${ selected ? 'selected' : '' }` }>
                <i className="icon">{ icon }</i>
            </div>
        );
    }
}

export default {
    container: NavList,
    item: Nav,
};
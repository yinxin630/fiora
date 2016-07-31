import React from 'react';
import '../style/navList.scss';

class NavList extends React.Component {
    render () {
        return (
                <nav className="nav-list">
                    { this.props.children }
                </nav>
        );
    }
}

class Nav extends React.Component {
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
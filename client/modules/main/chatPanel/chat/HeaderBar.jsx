import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

class HeaderBar extends Component {
    static propTypes = {
        group: ImmutablePropTypes.map,
    }
    render() {
        const { group } = this.props;
        return (
            <div className="chat-headerBar">
                <h2>{group && group.get('name')}</h2>
            </div>
        );
    }
}

export default connect((state) => {
    const focusGroup = state.get('focusGroup');
    const groups = state.getIn(['user', 'groups']);
    let group = null;
    if (groups) {
        group = groups.find(g => g.get('_id') === focusGroup);
    }
    return {
        group,
    };
})(HeaderBar);

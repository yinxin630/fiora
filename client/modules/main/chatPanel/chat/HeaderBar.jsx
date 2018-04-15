import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

import IconButton from '@/components/IconButton';

class HeaderBar extends Component {
    static propTypes = {
        group: ImmutablePropTypes.map,
        showGroupInfo: PropTypes.func,
    }
    render() {
        const { group, showGroupInfo } = this.props;
        return (
            <div className="chat-headerBar">
                <h2>{group && group.get('name')}</h2>
                <div>
                    <IconButton width={40} height={40} icon="gongneng" iconSize={24} onClick={showGroupInfo} />
                </div>
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

import action from '@/state/action';
import Linkman from './Linkman';

class LinkmanGroup extends Component {
    static propTypes = {
        groups: ImmutablePropTypes.list,
        focusGroup: PropTypes.string,
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.groups.size === 0 && nextProps.groups.size !== 0) {
            action.setFocusGroup(nextProps.groups.getIn(['0', '_id']));
        }
    }
    renderGroup(group) {
        const groupId = group.get('_id');
        const unread = group.get('unread');
        const lastMessage = group.getIn(['messages', group.get('messages').size - 1]);

        let time = new Date(group.get('createTime'));
        let preview = '暂无消息';
        if (lastMessage) {
            time = new Date(lastMessage.get('createTime'));
            preview = `${lastMessage.getIn(['from', 'username'])}: ${lastMessage.get('content')}`;
        }
        return (
            <Linkman
                key={groupId}
                name={group.get('name')}
                avatar={group.get('avatar')}
                preview={preview}
                time={time}
                unread={unread}
                focus={this.props.focusGroup === groupId}
                onClick={action.setFocusGroup.bind(null, groupId)}
            />
        );
    }
    render() {
        const { groups } = this.props;
        return (
            <div>
                {
                    groups.map(group => (
                        this.renderGroup(group)
                    ))
                }
            </div>
        );
    }
}

export default connect(state => ({
    groups: state.getIn(['user', 'groups']) || immutable.List(),
    focusGroup: state.get('focusGroup'),
}))(LinkmanGroup);

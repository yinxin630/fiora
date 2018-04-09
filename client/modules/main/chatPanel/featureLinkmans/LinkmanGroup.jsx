import React, { Component } from 'react';
import { connect } from 'react-redux';
import immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Linkman from './Linkman';

class LinkmanGroup extends Component {
    static propTypes = {
        groups: ImmutablePropTypes.list,
    }
    constructor(props) {
        super(props);
        this.state = {
            focus: '',
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.groups.length !== 0) {
            this.setState({
                focus: nextProps.groups.getIn(['0', '_id']),
            });
        }
    }
    changeFocus(focus) {
        this.setState({
            focus,
        });
    }
    renderGroup(group) {
        const groupId = group.get('_id');
        return (
            <Linkman
                key={groupId}
                name={group.get('name')}
                avatar={group.get('avatar')}
                preview="1111111111#(乖)"
                time={new Date()}
                unread={9}
                focus={this.state.focus === groupId}
                onClick={this.changeFocus.bind(this, groupId)}
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
}))(LinkmanGroup);

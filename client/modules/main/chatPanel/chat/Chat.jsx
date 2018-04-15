import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import immutable from 'immutable';

import fetch from 'utils/fetch';
import action from '@/state/action';
import Avatar from '@/components/Avatar';
import Tooltip from '@/components/Tooltip';
import HeaderBar from './HeaderBar';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import './Chat.less';

class Chat extends Component {
    static propTypes = {
        focusGroup: PropTypes.string,
        members: ImmutablePropTypes.list,
    }
    constructor(...args) {
        super(...args);
        this.state = {
            showGroupInfo: false,
        };
    }
    componentDidMount() {
        document.body.onclick = (e) => {
            const { currentTarget } = e;
            let { target } = e;
            do {
                if (/float-panel/.test(target.className)) {
                    return;
                }
                target = target.parentElement;
            } while (target !== currentTarget);
            this.closeGroupInfo();
        };
    }
    @autobind
    async showGroupInfo(e) {
        const { focusGroup } = this.props;
        this.setState({
            showGroupInfo: true,
        });
        e.stopPropagation();

        const [err, result] = await fetch('getGroupOnlineMembers', { groupId: focusGroup });
        if (!err) {
            action.setGroupMembers(focusGroup, result);
        }
    }
    @autobind
    closeGroupInfo() {
        this.setState({
            showGroupInfo: false,
        });
    }
    renderMembers() {
        return this.props.members.map(member => (
            <div key={member.get('_id')}>
                <div>
                    <Avatar size={24} src={member.getIn(['user', 'avatar'])} />
                    <p>{member.getIn(['user', 'username'])}</p>
                </div>
                <Tooltip placement="top" trigger={['hover']} overlay={<span>{member.get('environment')}</span>}>
                    <p>{member.get('browser')}&nbsp;&nbsp;{member.get('os')}</p>
                </Tooltip>
            </div>
        ));
    }
    render() {
        const { showGroupInfo } = this.state;
        return (
            <div className="module-main-chat">
                <HeaderBar showGroupInfo={this.showGroupInfo} />
                <MessageList />
                <ChatInput />
                <div className={`float-panel info ${showGroupInfo ? 'show' : 'hide'}`}>
                    <p>群组信息</p>
                    <div>
                        <div className="online-members">
                            <p>在线成员</p>
                            <div>{this.renderMembers()}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    const isLogin = !!state.getIn(['user', '_id']);
    if (!isLogin) {
        return {
            focusGroup: state.getIn(['user', 'groups', 0, '_id']),
            members: state.getIn(['user', 'groups', 0, 'members']) || immutable.fromJS([]),
        };
    }

    const focusGroup = state.get('focusGroup');
    const group = state.getIn(['user', 'groups']).find(g => g.get('_id') === focusGroup);

    return {
        focusGroup,
        members: group.get('members') || immutable.fromJS([]),
    };
})(Chat);

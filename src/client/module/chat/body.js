import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import './style/body.scss';

import UserList from './userList';
import ChatPanel from './chatPanel';
import EmptyChatPanel from './emptyChatPanel';

class Body extends React.Component {
    static propTypes = {
        linkmans: PropTypes.object.isRequired,
        me: PropTypes.string.isRequired,
        location: PropTypes.object.isRequired,
        routeParams: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const { linkmans, me, location, routeParams } = this.props;

        return (
            <div className="body">
                <UserList.container>
                    {
                        linkmans.map(linkman => (
                            <UserList.item
                                key={linkman.get('type') + linkman.get('_id')}
                                linkman={linkman}
                            />
                        ))
                    }
                </UserList.container>
                {
                    location.pathname === '/chat' ?
                        <EmptyChatPanel />
                        :
                        <ChatPanel
                            linkman={linkmans.find(linkman => linkman.get('type') === routeParams.type && linkman.get('_id') === routeParams.id)}
                            me={me}
                        />
                }
            </div>
        );
    }
}

export default connect(
    state => ({
        linkmans: state.getIn(['user', 'linkmans']),
        me: state.getIn(['user', '_id']),
    })
)(Body);

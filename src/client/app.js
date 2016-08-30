import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import './app.scss';

import user from './action/user';
import socket from './socket';

import Notification from './commonComponent/notification';

class App extends React.Component {
    static propTypes = {
        state: PropTypes.object.isRequired,
        children: PropTypes.arrayOf(PropTypes.element),
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    componentWillMount() {
        // register server event
        socket.on('groupMessage', data => {
            user.addGroupMessage(data);
        });
    }

    componentDidMount() {
        const token = window.localStorage.getItem('token');
        if (token && token !== '') {
            user
                .reConnect(token)
                .then(result => {
                    if (result.status === 201) {
                        this.context.router.push('/chat');
                    }
                });
        }
    }

    render() {
        // for debug
        console.log(this.props.state.toJS());

        return (
            <div className="window">
                <div className="background" />
                <Notification />
                { this.props.children }
            </div>
        );
    }
}

export default connect(
    state => ({
        state: state,
    })
)(App);

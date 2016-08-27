import React from 'react';
import './app.scss';

import { connect } from 'react-redux';
import user from './action/user';
import socket from './socket';

import Notification from './commonComponent/notification';

class App extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    componentWillMount() {
        // register server event
        socket.on('groupMessage', data => {
            user.addGroupMessage(data);
        });
    }

    componentDidMount() {
        let token = window.localStorage.getItem('token');
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
                <div className="background"></div>
                <Notification/>
                { this.props.children }
            </div>
        );
    }
}

export default connect(
    state => ({
        state: state
    })
)(App);
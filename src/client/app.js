import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import 'html5-desktop-notifications';

import './app.scss';

import user from './action/user';
import socket from './socket';

import Notification from './commonComponent/notification';

class App extends React.Component {
    static propTypes = {
        state: PropTypes.object.isRequired,
        children: PropTypes.element,
        location: PropTypes.object.isRequired,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    componentWillMount() {
        // register server event
        socket.on('groupMessage', data => {
            user.addGroupMessage(data);
            notify.createNotification(data.from.username, {
                icon: data.from.avatar,
                body: data.content,
                tag: data.from.id,
            });
        });

        // html5 notification
        if (notify.permissionLevel() === notify.PERMISSION_DEFAULT) {
            notify.requestPermission();
        }
        notify.config({
            pageVisibility: true,
            autoClose: 3000,
        });
    }

    componentDidMount() {
        const token = window.localStorage.getItem('token');
        if (token && token !== '') {
            user
                .reConnect(token)
                .then(result => {
                    if (result.status === 201 && this.props.location.pathname === '/') {
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

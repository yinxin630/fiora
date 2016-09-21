import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import './app.scss';

import user from '../action/user';
import socket from '../socket';

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
        // force to root path
        this.context.router.push('/');

        // try auto login
        const token = window.localStorage.getItem('token');
        if (token && token !== '') {
            user
            .reConnect(token)
            .then(result => {
                if (result.status === 201) {
                    user.online();
                    if (this.props.location.pathname === '/') {
                        // this.context.router.push('/main');
                    }
                }
            });
        }

        // register server event
        socket.on('groupMessage', data => {
            user.addGroupMessage(data);

            this.sound.play();

            if (window.Notification && window.Notification.permission === 'granted') {
                const notification = new window.Notification(
                    `${data.from.username} - 发来消息:`,
                    {
                        icon: data.from.avatar,
                        body: data.type === 'text' ? data.content : `[${data.type}]`,
                        tag: data.from.id,
                    }
                );
                notification.onclick = function () {
                    window.blur();
                    window.focus();
                    this.close();
                };
                // auto close
                setTimeout(notification.close.bind(notification), 3000);
            }
        });

        socket.on('message', data => {
            user.addMessage(data);

            this.sound.play();

            if (window.Notification && window.Notification.permission === 'granted') {
                const notification = new window.Notification(
                    `${data.from.username} - 发来消息:`,
                    {
                        icon: data.from.avatar,
                        body: data.type === 'text' ? data.content : `[${data.type}]`,
                        tag: data.from.id,
                    }
                );
                notification.onclick = function () {
                    this.close();
                    window.blur();
                    setTimeout(() => {
                        window.focus();
                    }, 0);
                };
                // auto close
                setTimeout(notification.close.bind(notification), 3000);
            }
        });

        socket.on('disconnect', () => {
            user.offline();
        });
        socket.on('reconnect', () => {
            user
            .reConnect()
            .then(result => {
                if (result.status === 201) {
                    user.online();
                }
            });
        });

        // html5 notification
        if (window.Notification && (window.Notification.permission === 'default' || window.Notification.permission === 'denied')) {
            window.Notification.requestPermission();
        }
    }

    render() {
        // for debug
        // console.log(this.props.state.toJS());

        return (
            <div className="window">
                <div className="background" />
                <audio
                    ref={sound => this.sound = sound}
                >
                    <source src="http://assets.suisuijiang.com/message_sound.mp3" type="audio/mp3" />
                    <source src="http://assets.suisuijiang.com/message_sound.ogg" type="audio/ogg" />
                    <source src="http://assets.suisuijiang.com/message_sound.wav" type="audio/wav" />
                </audio>
                { this.props.children }
            </div>
        );
    }
}

export default connect(
    state => ({
        state: state,
        windowFocus: state.getIn(['ui', 'windowFocus']),
        desktopNotification: state.getIn(['ui', 'desktopNotification']),
        soundNotification: state.getIn(['ui', 'soundNotification']),
    })
)(App);

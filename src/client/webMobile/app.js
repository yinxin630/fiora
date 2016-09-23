import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import './app.scss';

import user from '../action/user';

class App extends React.Component {
    static propTypes = {
        state: PropTypes.object,
        children: PropTypes.element,
        location: PropTypes.object.isRequired,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    componentWillMount() {
        // force to root path
        this.context.router.push('/login');

        // try auto login
        const token = window.localStorage.getItem('token');
        console.log(token);
        if (token && token !== '') {
            user
            .reConnect(token)
            .then(result => {
                console.log(result);
                if (result.status === 201) {
                    user.online();
                    if (this.props.location.pathname === '/login') {
                        this.context.router.push('/main/linkman');
                    }
                }
            });
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
    })
)(App);

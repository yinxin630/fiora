import React from 'react';
import './style/chat.scss';

import Header from './header';
import Body from './body';
import MaskLayout from './maskLayout';

class Chat extends React.Component {
    render() {
        const { avatar, name, width, height, location, routeParams } = this.props;
        console.log(this.props);
        return (
            <div className="app">
                <Header/>
                <Body
                    location={location}
                    routeParams={routeParams}
                    />
                <MaskLayout/>
            </div>
        );
    }
}

export default Chat;
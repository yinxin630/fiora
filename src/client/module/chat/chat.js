import React from 'react';
import './style/chat.scss';

import pureRenderMixin from 'react-addons-pure-render-mixin';
import Header from './header';
import Body from './body';
import MaskLayout from './maskLayout';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const { avatar, name, width, height, location, routeParams } = this.props;
        
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
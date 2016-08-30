import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './style/chat.scss';

import Header from './header';
import Body from './body';
import MaskLayout from './maskLayout';

class Chat extends React.Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        routeParams: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const { location, routeParams } = this.props;

        return (
            <div className="app">
                <Header />
                <Body
                    location={location}
                    routeParams={routeParams}
                />
                <MaskLayout />
            </div>
        );
    }
}

export default Chat;

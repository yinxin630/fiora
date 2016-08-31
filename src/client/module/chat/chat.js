import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './style/chat.scss';

import Header from './header';
import Body from './body';
import MaskLayout from './maskLayout';

class Chat extends React.Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        routeParams: PropTypes.object.isRequired,
        user: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const { location, routeParams, user } = this.props;
        if (!user.get('_id')) {
            // if store don't hava user data. render empty div
            return <div />;
        }

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

export default connect(
    state => ({
        user: state.get('user'),
    })
)(Chat);

'use strict'

const React = require('react');

import Body from '../components/Body.jsx';

export default class Main extends React.Component {
    render () {
        const { user, linkmans, linkmanFocus } = this.props;
        const { handleLinkmanClick } = this.props;
        return (
            <Body
                user={ user } 
                linkmans={ linkmans }
                linkmanFocus={ linkmanFocus }
                linkmanClick={ handleLinkmanClick }
            />
        );
    }
}
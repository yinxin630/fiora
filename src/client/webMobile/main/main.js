import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './main.scss';

import Toolbar from './toolbar';

class Main extends React.Component {
    static propTypes = {
        children: PropTypes.element,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div className="main">
                { this.props.children }
                <Toolbar />
            </div>
        );
    }
}

export default Main;

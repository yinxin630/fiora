import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './header.scss';

class Header extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const { name } = this.props;

        return (
            <div className="chat-header">
                <span>{ name }</span>
                <div
                    className="back"
                    onClick={this.context.router.goBack}
                >{'< 后退'}</div>
            </div>
        );
    }
}

export default Header;

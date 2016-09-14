import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './alert.scss';

class Alert extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        buttons: PropTypes.array.isRequired,
        children: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const { title, buttons, children } = this.props;

        return (
            <div className="alert">
                <div>{ title }</div>
                <div>{ children }</div>
                <div>
                {
                    buttons.map((b, index) => (
                        <span
                            key={index}
                            onClick={b.onClick}
                        >{ b.name }</span>
                    ))
                }
                </div>
            </div>
        );
    }
}

export default Alert;

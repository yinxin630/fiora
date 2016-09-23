import React from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './toolbar.scss';

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div className="toolbar">
                <div>
                    <i className="icon">
                        &#xe607;
                    </i>
                </div>
                <div>
                    <i className="icon">
                        &#xe606;
                    </i>
                </div>
            </div>
        );
    }
}

export default Toolbar;

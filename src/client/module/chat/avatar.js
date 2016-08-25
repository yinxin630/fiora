import React from 'react';
import './style/avatar.scss';

import pureRenderMixin from 'react-addons-pure-render-mixin';

class Avatar extends React.Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render () {
        const { avatar, name, width, height } = this.props;
        return (
            <div
                className="avatar"
                style={{ width, height }}
            >
                {
                    avatar.match(/http/) ?
                    <img
                        style={{ width, height }}
                        src={ avatar }
                    />
                    :
                    <div style={{ backgroundColor: avatar, width, height }}>
                        <span>{ name.slice(0, 1) }</span>
                    </div>
                }
            </div>
        );
    }
}

export default Avatar;
import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './style/avatar.scss';

class Avatar extends React.Component {
    static propTypes = {
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
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
                            src={avatar}
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

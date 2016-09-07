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
            avatar.match(/http/) ?
                <img
                    className="avatar-image"
                    style={{ width, height }}
                    src={avatar}
                />
            :
                <div
                    className="avatar-text"
                    style={{ backgroundColor: avatar, width, height, fontSize: width / 3 }}
                >
                    <span>{ name.slice(0, 1) }</span>
                </div>
        );
    }
}

export default Avatar;

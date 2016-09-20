import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './avatar.scss';

class Avatar extends React.Component {
    static propTypes = {
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        title: PropTypes.string,
        onClick: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const { avatar, name, width, height, title, onClick } = this.props;
        return (
            avatar.match(/^http/) ?
                <img
                    className="avatar-image"
                    style={{ width, height }}
                    src={`${avatar}?imageView2/2/w/${60}/h/${60}`}
                    title={title}
                    onClick={onClick}
                />
            :
                <div
                    className="avatar-text"
                    style={{ backgroundColor: avatar, width, height, fontSize: width / 2.5 }}
                    title={title}
                    onClick={onClick}
                >
                    { name.slice(0, 1) }
                </div>
        );
    }
}

export default Avatar;

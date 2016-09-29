import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './avatar.scss';

class Avatar extends React.Component {
    static propTypes = {
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string,
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
            avatar.match(/^(http|data:image)/) ?
                <img
                    className="avatar-image"
                    style={{ width, height, minWidth: width, minHeight: height }}
                    src={/^http/.test(avatar) ? `${avatar}?imageView2/2/w/${width}/h/${height}` : avatar}
                    title={title}
                    onClick={onClick}
                />
            :
                <div
                    className="avatar-text"
                    style={{ backgroundColor: avatar, width, height, fontSize: width / 2.5, minWidth: width, minHeight: height }}
                    title={title}
                    onClick={onClick}
                >
                    { name.slice(0, 1) }
                </div>
        );
    }
}

export default Avatar;

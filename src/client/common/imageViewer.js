import React, { PropTypes } from 'react';
import pureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import './imageViewer.scss';

import ui from '../action/pc';
import user from '../action/user';

let offsetX = 0;
let offsetY = 0;

class ImageViewer extends React.Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
        image: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            scale: 1,
            rotate: 0,
        };
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.renderImageViewer = this.renderImageViewer.bind(this);
        this.handleAddExpressionClick = this.handleAddExpressionClick.bind(this);
    }

    componentWillUpdate(nextProps) {
        if (this.props.image !== nextProps.image) {
            this.setState({ scale: 1, rotate: 0 });
        }
    }


    handleAddExpressionClick() {
        const { image } = this.props;
        user.addUserExpression(image);
        ui.closeImageViewer();
    }

    renderImageViewer() {
        const { image } = this.props;
        const { scale, rotate } = this.state;

        return (
            <div className="image-viewer">
                <div onClick={ui.closeImageViewer} />
                <img
                    src={image}
                    style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                    draggable
                    onDragStart={event => {
                        const img = document.createElement('img');
                        img.src = 'data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw==';
                        event.dataTransfer.setDragImage(img, 0, 0);
                        offsetX = event.clientX - event.target.offsetLeft;
                        offsetY = event.clientY - event.target.offsetTop;
                    }}
                    onDragOver={event => {
                        event.target.style.left = `${event.clientX - offsetX}px`;
                        event.target.style.top = `${event.clientY - offsetY}px`;
                        event.target.style.right = undefined;
                        event.target.style.bottom = undefined;
                    }}
                    onClick={event => event.bubbles = false}
                />
                <div
                    onClick={event => event.bubbles = true}
                >
                    <span
                        onClick={() => this.setState({ scale: scale + 0.25 })}
                    >
                        <i className="icon">&#xe60d;</i>
                    </span>
                    <span
                        onClick={() => this.setState({ scale: scale - 0.25 })}
                    >
                        <i className="icon">&#xe60c;</i>
                    </span>
                    <span
                        onClick={() => this.setState({ rotate: rotate + 90 })}
                    >
                        <i className="icon">&#xe60e;</i>
                    </span>
                    <span
                        onClick={this.handleAddExpressionClick}
                    >
                        <i className="icon">&#xe60f;</i>
                    </span>
                </div>
            </div>
        );
    }

    render() {
        return this.props.show ? this.renderImageViewer() : null;
    }
}

export default connect(
    state => ({
        show: state.getIn(['ui', 'showImageViewer']),
        image: state.getIn(['ui', 'imageViewerSrc']),
    })
)(ImageViewer);

import React, { PropTypes } from 'react';
import { Motion, spring } from 'react-motion';
import pureRenderMixin from 'react-addons-pure-render-mixin';

import './style/inputForm.scss';

class InputForm extends React.Component {
    static propTypes = {
        show: PropTypes.bool.isRequired,
        title: PropTypes.string,
        onClick: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = pureRenderMixin.shouldComponentUpdate.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);
    }

    handleCloseClick() {

    }

    render() {
        const { show, title, onClick } = this.props;

        return (
            <Motion
                defaultStyle={{ scale: 0.4, opacity: 0 }}
                style={{ scale: spring(show ? 1 : 0.4), opacity: spring(show ? 1 : 0) }}
            >
            {
                ({ scale, opacity }) => (
                    <div
                        className="input-form"
                        style={{ opacity, transform: `scale(${scale})`, display: opacity === 0 ? 'none' : 'flex' }}
                    >
                        <div>
                            <span>{ title }</span>
                            <i
                                className="icon"
                                onClick={this.handleCloseClick}
                            >&#xe603;</i>
                        </div>
                        <div>
                            <input
                                type="text"
                                ref={input => this.input = input}
                            />
                            <button
                                onClick={() => onClick(this.input.value)}
                            >确定</button>
                        </div>
                    </div>
                )
            }
            </Motion>
        );
    }
}

export default InputForm;

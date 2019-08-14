import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IconButton from './IconButton';
import './components.less';


class Input extends Component {
    static propTypes = {
        type: PropTypes.string,
        onEnter: PropTypes.func,
        placeholder: PropTypes.string,
    }

    static defaultProps = {
        type: 'text',
        onEnter: () => {},
        placeholder: '',
    }

    constructor(...args) {
        super(...args);
        this.state = {
            value: '',
        };
    }

    getValue() {
        // eslint-disable-next-line react/destructuring-assignment
        return this.state.value.trim();
    }

    handleInput = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

    handleClickClear = () => {
        this.setState({
            value: '',
        });
        this.input.focus();
    }

    handleKeyDown = (e) => {
        const { onEnter } = this.props;
        if (e.key === 'Enter' && onEnter) {
            // eslint-disable-next-line react/destructuring-assignment
            onEnter(this.state.value);
        }
    }

    handleIMEStart = () => {
        this.lockEnter = true;
    }

    handleIMEEnd = () => {
        this.lockEnter = false;
    }

    clear() {
        this.setState({
            value: '',
        });
    }

    render() {
        const { type, placeholder } = this.props;
        const { value } = this.state;
        return (
            <div className="component-input">
                <input
                    type={type}
                    value={value}
                    onChange={this.handleInput}
                    onInput={this.handleInput}
                    placeholder={placeholder}
                    ref={(i) => { this.input = i; }}
                    onKeyDown={this.handleKeyDown}
                    onCompositionStart={this.handleIMEStart}
                    onCompositionEnd={this.handleIMEEnd}
                />
                <IconButton width={32} height={32} iconSize={18} icon="clear" onClick={this.handleClickClear} />
            </div>
        );
    }
}

export default Input;

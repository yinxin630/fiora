import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import IconButton from './IconButton';
import './components.less';


class Input extends Component {
    static propTypes = {
        type: PropTypes.string,
    }
    static defaultProps = {
        type: 'text',
    }
    constructor(...args) {
        super(...args);
        this.state = {
            value: '',
        };
    }
    getValue() {
        return this.state.value.trim();
    }
    clear() {
        this.setState({
            value: '',
        });
    }
    @autobind
    handleInput(e) {
        this.setState({
            value: e.target.value,
        });
    }
    @autobind
    handleClickClear() {
        this.setState({
            value: '',
        });
    }
    render() {
        const { type } = this.props;
        const { value } = this.state;
        return (
            <div className="component-chat">
                <input type={type} value={value} onInput={this.handleInput} />
                <IconButton width={32} height={32} iconSize={18} icon="clear" onClick={this.handleClickClear} />
            </div>
        );
    }
}

export default Input;

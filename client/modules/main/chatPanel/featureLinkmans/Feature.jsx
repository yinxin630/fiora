import React, { Component } from 'react';
import autobind from 'autobind-decorator';

import IconButton from '@/components/IconButton';

class Feature extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            showAddButton: true,
        };
    }
    @autobind
    handleFocus() {
        this.setState({
            showAddButton: false,
        });
    }
    @autobind
    handleBlur() {
        this.setState({
            showAddButton: true,
        });
    }
    render() {
        const { showAddButton } = this.state;
        return (
            <div className="chatPanel-feature">
                <input placeholder="搜索群组/用户" onFocus={this.handleFocus} onBlur={this.handleBlur} />
                <i className="iconfont icon-search" />
                <IconButton style={{ display: showAddButton ? 'block' : 'none' }} width={40} height={40} icon="add" iconSize={38} />
            </div>
        );
    }
}

export default Feature;

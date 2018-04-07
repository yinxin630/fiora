import React, { Component } from 'react';
import autobind from 'autobind-decorator';

import IconButton from '@/components/IconButton';
import Dropdown from '@/components/Dropdown';
import Expression from './Expression';

class ChatInput extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            expressionVisible: false,
        };
    }
    @autobind
    onVisibleChange(visible) {
        this.setState({
            expressionVisible: visible,
        });
    }
    expressionDropdown = (
        <div className="expression-dropdown">
            <Expression />
        </div>
    )
    render() {
        const { expressionVisible } = this.state;
        return (
            <div className="chat-chatInput">
                <Dropdown
                    trigger={['click']}
                    visible={expressionVisible}
                    onVisibleChange={this.onVisibleChange}
                    overlay={this.expressionDropdown}
                    animation="slide-up"
                    placement="topLeft"
                >
                    <IconButton className="expression" width={44} height={44} icon="expression" iconSize={32} />
                </Dropdown>
                <IconButton className="feature" width={44} height={44} icon="feature" iconSize={32} />
                <input />
                <IconButton className="send" width={44} height={44} icon="send" iconSize={32} />
            </div>
        );
    }
}

export default ChatInput;

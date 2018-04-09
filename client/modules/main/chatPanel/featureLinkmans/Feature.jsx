import React, { Component } from 'react';
import autobind from 'autobind-decorator';

import IconButton from '@/components/IconButton';
import Dialog from '@/components/Dialog';
import Input from '@/components/Input';
import Message from '@/components/Message';
import socket from '@/socket';
import action from '@/state/action';

class Feature extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            showAddButton: true,
            showCreateGroupDialog: false,
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
    @autobind
    showCreateGroupDialog() {
        this.setState({
            showCreateGroupDialog: true,
        });
    }
    @autobind
    closeCreateGroupDialog() {
        this.setState({
            showCreateGroupDialog: false,
        });
    }
    @autobind
    handleCreateGroup() {
        const name = this.groupName.getValue();
        socket.emit('createGroup', { name }, (res) => {
            if (typeof res === 'string') {
                Message.error(res);
            } else {
                action.addGroup(res);
                this.groupName.clear();
                this.closeCreateGroupDialog();
            }
        });
    }
    render() {
        const { showAddButton, showCreateGroupDialog } = this.state;
        return (
            <div className="chatPanel-feature">
                <input placeholder="搜索群组/用户" onFocus={this.handleFocus} onBlur={this.handleBlur} />
                <i className="iconfont icon-search" />
                <IconButton style={{ display: showAddButton ? 'block' : 'none' }} width={40} height={40} icon="add" iconSize={38} onClick={this.showCreateGroupDialog} />
                <Dialog className="create-group-dialog" title="创建群组" visible={showCreateGroupDialog} onClose={this.closeCreateGroupDialog}>
                    <div className="content">
                        <h3>请输入群组名</h3>
                        <Input ref={i => this.groupName = i} />
                        <button onClick={this.handleCreateGroup}>创建</button>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default Feature;

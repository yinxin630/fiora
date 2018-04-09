import React, { Component } from 'react';
import autobind from 'autobind-decorator';

import IconButton from '@/components/IconButton';
import Dialog from '@/components/Dialog';
import Input from '@/components/Input';

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
                        <Input />
                        <button>创建</button>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default Feature;

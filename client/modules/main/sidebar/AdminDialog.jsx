import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import Dialog from '@/components/Dialog';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Message from '@/components/Message';
import fetch from '../../../../utils/fetch';

class AdminDialog extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
    }
    constructor(...args) {
        super(...args);
        this.state = {
            sealList: [],
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.visible === false && nextProps.visible === true) {
            this.getSealList();
        }
    }
    @autobind
    async getSealList() {
        const [err, res] = await fetch('getSealList');
        if (!err) {
            this.setState({
                sealList: res,
            });
        }
    }
    @autobind
    async handleSeal() {
        const [err] = await fetch('sealUser', { username: this.seatUsername.getValue() });
        if (!err) {
            Message.success('封禁用户成功');
            this.getSealList();
        }
    }
    render() {
        const { visible, onClose } = this.props;
        return (
            <Dialog className="dialog admin" visible={visible} title="管理员控制台" onClose={onClose}>
                <div className="content">
                    <div>
                        <p>封禁用户</p>
                        <div className="seal">
                            <Input ref={i => this.seatUsername = i} placeholder="要封禁的用户名" />
                            <Button onClick={this.handleSeal}>确定</Button>
                        </div>
                    </div>
                    <div>
                        <p>封禁用户列表</p>
                        <div className="seal-list">
                            {
                                this.state.sealList.map(username => (
                                    <span key={username}>{username}</span>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </Dialog>
        );
    }
}

export default AdminDialog;

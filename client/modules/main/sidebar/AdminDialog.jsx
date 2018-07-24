import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import Dialog from '@/components/Dialog';
import Input from '@/components/Input';
import Button from '@/components/Button';
import fetch from '../../../../utils/fetch';

class AdminDialog extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
    }
    @autobind
    static async getSealList() {
        const [err, res] = await fetch('getSealList');
        console.log(err, res);
    }
    @autobind
    async handleSeal() {
        console.log(this.seatUsername.getValue());

        console.log('发送请求');
        const [err, res] = await fetch('sealUser', { username: this.seatUsername.getValue() });
        console.log(err, res);
    }
    render() {
        const { visible, onClose } = this.props;
        return (
            <Dialog className="dialog admin" visible={visible} title="个人信息设置" onClose={onClose}>
                <div className="content">
                    <div>
                        <p>封禁用户</p>
                        <div className="seat">
                            <Input ref={i => this.seatUsername = i} />
                            <Button onClick={this.handleSeal}>确定</Button>
                        </div>
                    </div>
                    <div>
                        <p>封禁用户列表</p>
                        <div className="seat">
                            <Button onClick={AdminDialog.getSealList}>获取</Button>
                        </div>
                    </div>
                </div>
            </Dialog>
        );
    }
}

export default AdminDialog;

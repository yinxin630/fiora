import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';

import Dialog from '../../../components/Dialog';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Message from '../../../components/Message';
import fetch from '../../../../utils/fetch';

@immutableRenderDecorator
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
        // eslint-disable-next-line react/destructuring-assignment
        if (this.props.visible === false && nextProps.visible === true) {
            this.getSealList();
        }
    }

    /**
     * 获取被封禁的用户列表
     */
    getSealList = async () => {
        const [err, res] = await fetch('getSealList');
        if (!err) {
            this.setState({
                sealList: res,
            });
        }
    }

    /**
     * 处理重置用户密码操作
     */
    handleResetPassword = async () => {
        const [err, res] = await fetch('resetUserPassword', { username: this.resetPasswordUsername.getValue() });
        if (!err) {
            Message.success(`已将该用户的密码重置为:${res.newPassword}`);
        }
    }

    /**
     * 处理封禁用户操作
     */
    handleSeal = async () => {
        const [err] = await fetch('sealUser', { username: this.sealUsername.getValue() });
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
                        <p>重置用户密码</p>
                        <div className="reset-user-password">
                            <Input ref={(i) => { this.resetPasswordUsername = i; }} placeholder="要重置密码的用户名" />
                            <Button onClick={this.handleResetPassword}>确定</Button>
                        </div>
                    </div>
                    <div>
                        <p>封禁用户</p>
                        <div className="seal">
                            <Input ref={(i) => { this.sealUsername = i; }} placeholder="要封禁的用户名" />
                            <Button onClick={this.handleSeal}>确定</Button>
                        </div>
                    </div>
                    <div>
                        <p>封禁用户列表</p>
                        <div className="seal-list">
                            {
                                // eslint-disable-next-line react/destructuring-assignment
                                this.state.sealList.map((username) => (
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

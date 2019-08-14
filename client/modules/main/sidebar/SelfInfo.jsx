import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import fetch from '../../../../utils/fetch';
import readDiskFile from '../../../../utils/readDiskFile';
import uploadFile from '../../../../utils/uploadFile';
import Input from '../../../components/Input';
import Dialog from '../../../components/Dialog';
import Button from '../../../components/Button';
import Message from '../../../components/Message';
import action from '../../../state/action';
import socket from '../../../socket';

import config from '../../../../config/client';


class SelfInfo extends Component {
    /**
     * 让用户重新登录
     * @param {string} message 提示消息
     */
    static reLogin(message) {
        action.logout();
        window.localStorage.removeItem('token');
        Message.success(message);
        socket.disconnect();
        socket.connect();
    }

    static propTypes = {
        visible: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        userId: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        primaryColor: PropTypes.string.isRequired,
    }

    constructor(...args) {
        super(...args);
        this.state = {
            loading: false,
            cropper: false,
            cropperSrc: '',
            cropperExt: 'png',
        };
    }

    toggleAvatarLoading = () => {
        const { loading } = this.state;
        this.setState({
            loading: !loading,
        });
    }

    /**
     * 修改头像
     */
    selectAvatar = async () => {
        const file = await readDiskFile('blob', 'image/png,image/jpeg,image/gif');
        if (!file) {
            return;
        }
        if (file.length > config.maxAvatarSize) {
            // eslint-disable-next-line consistent-return
            return Message.error('设置头像失败, 请选择小于1MB的图片');
        }

        // gif头像不需要裁剪
        if (file.ext === 'gif') {
            this.uploadAvatar(file.result, file.ext);
        } else {
            // 显示头像裁剪
            const reader = new FileReader();
            reader.readAsDataURL(file.result);
            reader.onloadend = () => {
                this.setState({
                    cropper: true,
                    cropperSrc: reader.result,
                    cropperExt: file.ext,
                });
            };
        }
    }

    uploadAvatar = async (blob, ext = 'png') => {
        this.toggleAvatarLoading();

        try {
            const { userId } = this.props;
            const avatarUrl = await uploadFile(blob, `Avatar/${userId}_${Date.now()}`, `Avatar_${userId}_${Date.now()}.${ext}`);
            const [changeAvatarErr] = await fetch('changeAvatar', { avatar: avatarUrl });
            if (changeAvatarErr) {
                Message.error(changeAvatarErr);
            } else {
                action.setAvatar(URL.createObjectURL(blob));
                Message.success('修改头像成功');
                this.setState({ cropper: false });
            }
        } catch (err) {
            console.error(err);
            Message.error('上传头像失败');
        } finally {
            this.toggleAvatarLoading();
        }
    }

    changeAvatar = () => {
        this.cropper.getCroppedCanvas().toBlob(async (blob) => {
            const { cropperExt } = this.state;
            this.uploadAvatar(blob, cropperExt);
        });
    }

    /**
     * 修改密码
     */
    changePassword = async () => {
        const [err] = await fetch('changePassword', {
            oldPassword: this.oldPassword.getValue(),
            newPassword: this.newPassword.getValue(),
        });
        if (!err) {
            // eslint-disable-next-line react/destructuring-assignment
            this.props.onClose();
            SelfInfo.reLogin('修改密码成功, 请使用新密码重新登录');
        }
    }

    /**
     * 修改用户名
     */
    changeUsername = async () => {
        const [err] = await fetch('changeUsername', {
            username: this.username.getValue(),
        });
        if (!err) {
            // eslint-disable-next-line react/destructuring-assignment
            this.props.onClose();
            SelfInfo.reLogin('修改用户名成功, 请使用新用户名重新登录');
        }
    }

    render() {
        const {
            visible, onClose, avatar, primaryColor,
        } = this.props;
        const { loading, cropper, cropperSrc } = this.state;
        return (
            <Dialog className="dialog selfInfo" visible={visible} title="个人信息设置" onClose={onClose}>
                <div className="content">
                    <div>
                        <p>修改头像</p>
                        <div className="avatar-preview">
                            {
                                cropper
                                    ? (
                                        <div className="cropper">
                                            <Cropper
                                                className={loading ? 'blur' : ''}
                                                ref={(i) => { this.cropper = i; }}
                                                src={cropperSrc}
                                                style={{ height: 460, width: 460 }}
                                                aspectRatio={1}
                                            />
                                            <Button onClick={this.changeAvatar}>修改头像</Button>
                                            <ReactLoading className={`loading ${loading ? 'show' : 'hide'}`} type="spinningBubbles" color={`rgb(${primaryColor}`} height={120} width={120} />
                                        </div>
                                    )
                                    : (
                                        <div className="preview">
                                            <img className={loading ? 'blur' : ''} alt="头像预览" src={avatar} onClick={this.selectAvatar} />
                                            <ReactLoading className={`loading ${loading ? 'show' : 'hide'}`} type="spinningBubbles" color={`rgb(${primaryColor}`} height={80} width={80} />
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                    <div>
                        <p>修改密码</p>
                        <div className="change-password">
                            <Input ref={(i) => { this.oldPassword = i; }} type="password" placeholder="旧密码" />
                            <Input ref={(i) => { this.newPassword = i; }} type="password" placeholder="新密码" />
                            <Button onClick={this.changePassword}>确认修改</Button>
                        </div>
                    </div>
                    <div>
                        <p>修改用户名</p>
                        <div className="change-username">
                            <Input ref={(i) => { this.username = i; }} type="text" placeholder="用户名" />
                            <Button onClick={this.changeUsername}>确认修改</Button>
                        </div>
                    </div>
                </div>
            </Dialog>
        );
    }
}

export default connect((state) => ({
    avatar: state.getIn(['user', 'avatar']),
    primaryColor: state.getIn(['ui', 'primaryColor']),
    userId: state.getIn(['user', '_id']),
}))(SelfInfo);

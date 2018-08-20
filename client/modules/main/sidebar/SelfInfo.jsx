import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import Input from '@/components/Input';
import Dialog from '@/components/Dialog';
import Button from '@/components/Button';
import Message from '@/components/Message';
import action from '@/state/action';
import socket from '@/socket';

import fetch from 'utils/fetch';
import readDiskFile from 'utils/readDiskFile';
import uploadFile from 'utils/uploadFile';
import config from '../../../../config/client';


@autobind
class SelfInfo extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        userId: PropTypes.string,
        avatar: PropTypes.string,
        primaryColor: PropTypes.string.isRequired,
    }
    state = {
        loading: false,
        cropper: false,
        cropperSrc: '',
        cropperExt: 'png',
    }
    toggleAvatarLoading() {
        this.setState({
            loading: !this.state.loading,
        });
    }
    /**
     * 修改头像
     */
    async selectAvatar() {
        const file = await readDiskFile('blob', 'image/png,image/jpeg,image/gif');
        if (!file) {
            return;
        }
        if (file.length > config.maxAvatarSize) {
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
    async uploadAvatar(blob, ext = 'png') {
        this.toggleAvatarLoading();

        try {
            const avatarUrl = await uploadFile(blob, `Avatar/${this.props.userId}_${Date.now()}`, `Avatar_${this.props.userId}_${Date.now()}.${ext}`);
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
    changeAvatar() {
        this.cropper.getCroppedCanvas().toBlob(async (blob) => {
            this.uploadAvatar(blob, this.state.cropperExt);
        });
    }
    /**
     * 修改密码
     */
    async changePassword() {
        const [err] = await fetch('changePassword', {
            oldPassword: this.oldPassword.getValue(),
            newPassword: this.newPassword.getValue(),
        });
        if (!err) {
            action.logout();
            window.localStorage.removeItem('token');
            Message.success('修改密码成功, 请重新登录');
            socket.disconnect();
            socket.connect();
            this.closeUserDialog();
        }
    }
    render() {
        const { visible, onClose, avatar, primaryColor } = this.props;
        const { loading, cropper, cropperSrc } = this.state;
        return (
            <Dialog className="dialog selfInfo" visible={visible} title="个人信息设置" onClose={onClose}>
                <div className="content">
                    <div>
                        <p>修改头像</p>
                        <div className="avatar-preview">
                            {
                                cropper ?
                                    <div className="cropper">
                                        <Cropper
                                            className={loading ? 'blur' : ''}
                                            ref={i => this.cropper = i}
                                            src={cropperSrc}
                                            style={{ height: 460, width: 460 }}
                                            aspectRatio={1}
                                        />
                                        <Button onClick={this.changeAvatar}>修改头像</Button>
                                        <ReactLoading className={`loading ${loading ? 'show' : 'hide'}`} type="spinningBubbles" color={`rgb(${primaryColor}`} height={120} width={120} />
                                    </div>
                                    :
                                    <div className="preview">
                                        <img className={loading ? 'blur' : ''} src={avatar} onClick={this.selectAvatar} />
                                        <ReactLoading className={`loading ${loading ? 'show' : 'hide'}`} type="spinningBubbles" color={`rgb(${primaryColor}`} height={80} width={80} />
                                    </div>
                            }
                        </div>
                    </div>
                    <div>
                        <p>修改密码</p>
                        <div className="change-password">
                            <Input ref={i => this.oldPassword = i} type="password" placeholder="旧密码" />
                            <Input ref={i => this.newPassword = i} type="password" placeholder="新密码" />
                            <Button onClick={this.changePassword}>修改密码</Button>
                        </div>
                    </div>
                </div>
            </Dialog>
        );
    }
}

export default connect(state => ({
    avatar: state.getIn(['user', 'avatar']),
    primaryColor: state.getIn(['ui', 'primaryColor']),
    userId: state.getIn(['user', '_id']),
}))(SelfInfo);

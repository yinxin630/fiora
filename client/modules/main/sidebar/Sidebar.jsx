import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TwitterPicker } from 'react-color';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import Switch from 'react-switch';
import ReactLoading from 'react-loading';

import setCssVariable from '../../../../utils/setCssVariable';
import readDiskFile from '../../../../utils/readDiskFile';
import playSound from '../../../../utils/sound';
import booleanStateDecorator from '../../../../utils/booleanStateDecorator';
import uploadFile from '../../../../utils/uploadFile';
import action from '../../../state/action';
import socket from '../../../socket';
import Avatar from '../../../components/Avatar';
import IconButton from '../../../components/IconButton';
import Dialog from '../../../components/Dialog';
import Button from '../../../components/Button';
import Message from '../../../components/Message';
import Tooltip from '../../../components/Tooltip';
import OnlineStatus from './OnlineStatus';
import AppDownload from './AppDownload';
import AdminDialog from './AdminDialog';
import SelfInfo from './SelfInfo';
import config from '../../../../config/client';

import './Sidebar.less';
import { isMobile } from '../../../../utils/ua';

/**
 * 页面左边侧栏
 */
@booleanStateDecorator({
    settingDialog: false, // 设置
    userDialog: false, // 个人信息设置
    rewardDialog: false, // 打赏
    infoDialog: false, // 关于
    appDownloadDialog: false, // APP下载
    adminDialog: false, // 管理员
})
class Sidebar extends Component {
    static logout() {
        action.logout();
        window.localStorage.removeItem('token');
        Message.success('您已经退出登录');
        socket.disconnect();
        socket.connect();
    }

    static resetThume() {
        action.setPrimaryColor(config.primaryColor);
        action.setPrimaryTextColor(config.primaryTextColor);
        action.setBackgroundImage(config.backgroundImage);
        setCssVariable(config.primaryColor, config.primaryTextColor);
        window.localStorage.removeItem('primaryColor');
        window.localStorage.removeItem('primaryTextColor');
        window.localStorage.removeItem('backgroundImage');
        Message.success('已恢复默认主题');
    }

    static resetSound() {
        action.setSound(config.sound);
        window.localStorage.removeItem('sound');
        Message.success('已恢复默认提示音');
    }

    static handleSelectSound(sound) {
        playSound(sound);
        action.setSound(sound);
    }

    static propTypes = {
        isLogin: PropTypes.bool.isRequired,
        isConnect: PropTypes.bool.isRequired,
        avatar: PropTypes.string.isRequired,
        primaryColor: PropTypes.string.isRequired,
        primaryTextColor: PropTypes.string.isRequired,
        backgroundImage: PropTypes.string.isRequired,
        sound: PropTypes.string.isRequired,
        soundSwitch: PropTypes.bool.isRequired,
        notificationSwitch: PropTypes.bool.isRequired,
        voiceSwitch: PropTypes.bool.isRequired,
        selfVoiceSwitch: PropTypes.bool.isRequired,
        isAdmin: PropTypes.bool.isRequired,
        userId: PropTypes.string.isRequired,
    };

    constructor(...args) {
        super(...args);
        this.state = {
            backgroundLoading: false,
        };
    }

    handlePrimaryColorChange = (color) => {
        const primaryColor = `${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`;
        const { primaryTextColor } = this.props;
        action.setPrimaryColor(`${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`);
        setCssVariable(primaryColor, primaryTextColor);
    };

    handlePrimaryTextColorChange = (color) => {
        const primaryTextColor = `${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`;
        const { primaryColor } = this.props;
        action.setPrimaryTextColor(`${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`);
        setCssVariable(primaryColor, primaryTextColor);
    };

    toggleBackgroundLoading = () => {
        const { backgroundLoading } = this.state;
        this.setState({
            backgroundLoading: !backgroundLoading,
        });
    };

    selectBackgroundImage = async () => {
        this.toggleBackgroundLoading();
        try {
            const image = await readDiskFile('blob', 'image/png,image/jpeg,image/gif');
            if (!image) {
                return;
            }
            if (image.length > config.maxBackgroundImageSize) {
                // eslint-disable-next-line consistent-return
                return Message.error('设置背景图失败, 请选择小于3MB的图片');
            }
            const { userId } = this.props;
            const imageUrl = await uploadFile(
                image.result,
                `BackgroundImage/${userId}_${Date.now()}`,
                `BackgroundImage_${userId}_${Date.now()}.${image.ext}`,
            );
            action.setBackgroundImage(imageUrl);
        } finally {
            this.toggleBackgroundLoading();
        }
    };

    static renderTooltip(text, component) {
        const children = <div>{component}</div>;
        if (isMobile) {
            return children;
        }
        return (
            <Tooltip placement="right" mouseEnterDelay={0.3} overlay={<span>{text}</span>}>
                {children}
            </Tooltip>
        );
    }

    render() {
        const {
            isLogin,
            isConnect,
            avatar,
            primaryColor,
            primaryTextColor,
            backgroundImage,
            sound,
            soundSwitch,
            notificationSwitch,
            voiceSwitch,
            selfVoiceSwitch,
            isAdmin,
        } = this.props;
        const {
            settingDialog,
            userDialog,
            rewardDialog,
            infoDialog,
            appDownloadDialog,
            backgroundLoading,
            adminDialog,
        } = this.state;
        return (
            <div className="module-main-sidebar">
                {isLogin && (
                    <Avatar className="avatar" src={avatar} onClick={this.toggleUserDialog} />
                )}
                {isLogin && (
                    <OnlineStatus className="status" status={isConnect ? 'online' : 'offline'} />
                )}
                <div className="buttons">
                    {isLogin && isAdmin
                        ? Sidebar.renderTooltip(
                            '管理员',
                            <IconButton
                                width={40}
                                height={40}
                                icon="administrator"
                                iconSize={28}
                                onClick={this.toggleAdminDialog}
                            />,
                        )
                        : null}
                    <Tooltip placement="right" mouseEnterDelay={0.3} overlay={<span>源码</span>}>
                        <a
                            href="https://github.com/yinxin630/fiora"
                            target="_black"
                            rel="noopener noreferrer"
                        >
                            <IconButton width={40} height={40} icon="github" iconSize={26} />
                        </a>
                    </Tooltip>
                    {Sidebar.renderTooltip(
                        '下载APP',
                        <IconButton
                            width={40}
                            height={40}
                            icon="app"
                            iconSize={28}
                            onClick={this.toggleAppDownloadDialog}
                        />,
                    )}
                    {Sidebar.renderTooltip(
                        '打赏',
                        <IconButton
                            width={40}
                            height={40}
                            icon="dashang"
                            iconSize={26}
                            onClick={this.toggleRewardDialog}
                        />,
                    )}
                    {Sidebar.renderTooltip(
                        '关于',
                        <IconButton
                            width={40}
                            height={40}
                            icon="about"
                            iconSize={26}
                            onClick={this.toggleInfoDialog}
                        />,
                    )}
                    {Sidebar.renderTooltip(
                        '设置',
                        <IconButton
                            width={40}
                            height={40}
                            icon="setting"
                            iconSize={26}
                            onClick={this.toggleSettingDialog}
                        />,
                    )}
                    {isLogin
                        && Sidebar.renderTooltip(
                            '退出登录',
                            <IconButton
                                width={40}
                                height={40}
                                icon="logout"
                                iconSize={26}
                                onClick={Sidebar.logout}
                            />,
                        )}
                </div>
                <Dialog
                    className="dialog system-setting"
                    visible={settingDialog}
                    title="系统设置"
                    onClose={this.toggleSettingDialog}
                >
                    <div className="content">
                        <div>
                            <p>恢复</p>
                            <div className="buttons">
                                <Button onClick={Sidebar.resetThume}>恢复默认主题</Button>
                                <Button onClick={Sidebar.resetSound}>恢复默认提示音</Button>
                            </div>
                        </div>
                        <div className="switch-container">
                            <p>开关</p>
                            <div className="switch">
                                <div>
                                    <p>声音提醒</p>
                                    <Switch
                                        onChange={action.setSoundSwitch}
                                        checked={soundSwitch}
                                    />
                                </div>
                                <div>
                                    <p>桌面提醒</p>
                                    <Switch
                                        onChange={action.setNotificationSwitch}
                                        checked={notificationSwitch}
                                    />
                                </div>
                                <div>
                                    <p>语音播报</p>
                                    <Switch
                                        onChange={action.setVoiceSwitch}
                                        checked={voiceSwitch}
                                    />
                                </div>
                                <div>
                                    <p>播报自己消息</p>
                                    <Switch
                                        onChange={action.setSelfVoiceSwitch}
                                        checked={selfVoiceSwitch}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>提示音</p>
                            <div className="sounds">
                                <RadioGroup
                                    value={sound}
                                    onChange={Sidebar.handleSelectSound}
                                    horizontal
                                >
                                    <RadioButton value="default">默认</RadioButton>
                                    <RadioButton value="apple">苹果</RadioButton>
                                    <RadioButton value="pcqq">电脑QQ</RadioButton>
                                    <RadioButton value="mobileqq">手机QQ</RadioButton>
                                    <RadioButton value="momo">陌陌</RadioButton>
                                    <RadioButton value="huaji">滑稽</RadioButton>
                                </RadioGroup>
                            </div>
                        </div>
                        <div>
                            <p>
                                背景图{' '}
                                <span className="background-tip">
                                    背景图会被拉伸到浏览器窗口大小, 合理的比例会取得更好的效果
                                </span>
                            </p>
                            <div className="image-preview">
                                <img
                                    className={backgroundLoading ? 'blur' : ''}
                                    src={backgroundImage}
                                    alt="背景图预览"
                                    onClick={this.selectBackgroundImage}
                                />
                                <ReactLoading
                                    className={`loading ${backgroundLoading ? 'show' : 'hide'}`}
                                    type="spinningBubbles"
                                    color={`rgb(${primaryColor}`}
                                    height={100}
                                    width={100}
                                />
                            </div>
                        </div>
                        <div>
                            <p>主题颜色</p>
                            <div className="color-info">
                                <div style={{ backgroundColor: `rgb(${primaryColor})` }} />
                                <span>{`rgb(${primaryColor})`}</span>
                            </div>
                            <TwitterPicker
                                className="color-picker"
                                color={`rgb(${primaryColor})`}
                                onChange={this.handlePrimaryColorChange}
                            />
                        </div>
                        <div>
                            <p>文字颜色</p>
                            <div className="color-info">
                                <div style={{ backgroundColor: `rgb(${primaryTextColor})` }} />
                                <span>{`rgb(${primaryTextColor})`}</span>
                            </div>
                            <TwitterPicker
                                className="color-picker"
                                color={`rgb(${primaryTextColor})`}
                                onChange={this.handlePrimaryTextColorChange}
                            />
                        </div>
                    </div>
                </Dialog>
                <SelfInfo visible={userDialog} onClose={this.toggleUserDialog} />
                <Dialog
                    className="dialog reward "
                    visible={rewardDialog}
                    title="打赏"
                    onClose={this.toggleRewardDialog}
                >
                    <div className="content">
                        <p>
                            如果你觉得这个聊天室代码对你有帮助, 希望打赏下给个鼓励~~
                            <br />
                            作者大多数时间在线, 欢迎提问, 有问必答
                        </p>
                        <div>
                            <img src={require('../../../assets/images/alipay.jpg')} alt="支付宝二维码" />
                            <img src={require('../../../assets/images/wxpay.jpg')} alt="微信二维码" />
                        </div>
                    </div>
                </Dialog>
                <Dialog
                    className="dialog fiora-info "
                    visible={infoDialog}
                    title="关于"
                    onClose={this.toggleInfoDialog}
                >
                    <div className="content">
                        <div>
                            <p>作者主页</p>
                            <a
                                href="https://suisuijiang.com"
                                target="_black"
                                rel="noopener noreferrer"
                            >
                                https://suisuijiang.com
                            </a>
                        </div>
                        <div>
                            <p>如何运行</p>
                            <a
                                href="https://github.com/yinxin630/fiora/blob/master/doc/INSTALL.ZH.md"
                                target="_black"
                                rel="noopener noreferrer"
                            >
                                https://github.com/yinxin630/fiora/blob/master/doc/INSTALL.ZH.md
                            </a>
                        </div>
                        <div>
                            <p>架构 / 设计思路</p>
                            <a
                                href="https://github.com/yinxin630/blog/issues/3"
                                target="_black"
                                rel="noopener noreferrer"
                            >
                                https://github.com/yinxin630/blog/issues/3
                            </a>
                        </div>
                        <div>
                            <p>将fiora安装到主屏(PWA)</p>
                            <ul>
                                <li>地址栏输入: Chrome://flags</li>
                                <li>
                                    搜索并启用以下项目: Desktop PWAs(桌面PWAs)、App
                                    Banners(应用横幅)、Experimental App Banners(实验性应用横幅)
                                </li>
                                <li>重启浏览器使修改的设置生效</li>
                                <li>点击地址栏最右边按钮</li>
                                <li>选择&quot;安装 fiora&quot;</li>
                            </ul>
                        </div>
                        <div>
                            <p>输入框快捷键</p>
                            <ul>
                                <li>Alt + S: 发送滑稽</li>
                                <li>Alt + D: 发送表情包</li>
                            </ul>
                        </div>
                        <div>
                            <p>命令消息</p>
                            <ul>
                                <li>-roll [number]: 掷点</li>
                                <li>-rps: 石头剪刀布</li>
                            </ul>
                        </div>
                    </div>
                </Dialog>
                <AppDownload visible={appDownloadDialog} onClose={this.toggleAppDownloadDialog} />
                <AdminDialog visible={adminDialog} onClose={this.toggleAdminDialog} />
            </div>
        );
    }
}

export default connect((state) => ({
    isLogin: !!state.getIn(['user', '_id']),
    isConnect: state.get('connect'),
    avatar: state.getIn(['user', 'avatar']),
    isAdmin: state.getIn(['user', 'isAdmin']),
    primaryColor: state.getIn(['ui', 'primaryColor']),
    primaryTextColor: state.getIn(['ui', 'primaryTextColor']),
    backgroundImage: state.getIn(['ui', 'backgroundImage']),
    sound: state.getIn(['ui', 'sound']),
    soundSwitch: state.getIn(['ui', 'soundSwitch']),
    notificationSwitch: state.getIn(['ui', 'notificationSwitch']),
    voiceSwitch: state.getIn(['ui', 'voiceSwitch']),
    selfVoiceSwitch: state.getIn(['ui', 'selfVoiceSwitch']),
    userId: state.getIn(['user', '_id']),
}))(Sidebar);

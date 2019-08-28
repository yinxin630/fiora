import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Switch from 'react-switch';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import ReactLoading from 'react-loading';
import { TwitterPicker } from 'react-color';

import Dialog from '../../components/Dialog';
import Button from '../../components/Button';
import config from '../../../config/client';
import setCssVariable from '../../../utils/setCssVariable';
import Message from '../../components/Message';
import useAction from '../../hooks/useAction';
import { State } from '../../state/reducer';
import uploadFile from '../../../utils/uploadFile';
import readDiskFile from '../../../utils/readDiskFile';
import playSound from '../../../utils/playSound';

import Style from './Setting.less';
import Common from './Common.less';

interface SettingProps {
    visible: boolean;
    onClose: () => void;
}

function Setting(props: SettingProps) {
    const { visible, onClose } = props;

    const action = useAction();
    const soundSwitch = useSelector((state: State) => state.status.soundSwitch);
    const notificationSwitch = useSelector((state: State) => state.status.notificationSwitch);
    const voiceSwitch = useSelector((state: State) => state.status.voiceSwitch);
    const selfVoiceSwitch = useSelector((state: State) => state.status.selfVoiceSwitch);
    const sound = useSelector((state: State) => state.status.sound);
    const primaryColor = useSelector((state: State) => state.status.primaryColor);
    const primaryTextColor = useSelector((state: State) => state.status.primaryTextColor);
    const backgroundImage = useSelector((state: State) => state.status.backgroundImage);
    const userId = useSelector((state: State) => state.user._id);

    const [backgroundLoading, toggleBackgroundLoading] = useState(false);

    function resetThume() {
        action.setStatus('primaryColor', config.primaryColor);
        action.setStatus('primaryTextColor', config.primaryTextColor);
        action.setStatus('backgroundImage', config.backgroundImage);
        setCssVariable(config.primaryColor, config.primaryTextColor);
        window.localStorage.removeItem('primaryColor');
        window.localStorage.removeItem('primaryTextColor');
        window.localStorage.removeItem('backgroundImage');
        Message.success('已恢复默认主题');
    }

    function resetSound() {
        action.setStatus('sound', config.sound);
        window.localStorage.removeItem('sound');
        Message.success('已恢复默认提示音');
    }

    function handleSelectSound(newSound) {
        playSound(newSound);
        action.setStatus('sound', newSound);
    }

    async function selectBackgroundImage() {
        toggleBackgroundLoading(true);
        try {
            const image = await readDiskFile('blob', 'image/png,image/jpeg,image/gif');
            if (!image) {
                return;
            }
            if (image.length > config.maxBackgroundImageSize) {
                // eslint-disable-next-line consistent-return
                return Message.error('设置背景图失败, 请选择小于3MB的图片');
            }
            const imageUrl = await uploadFile(
                image.result as Blob,
                `BackgroundImage/${userId}_${Date.now()}`,
                `BackgroundImage_${userId}_${Date.now()}.${image.ext}`,
            );
            action.setStatus('backgroundImage', imageUrl);
        } finally {
            toggleBackgroundLoading(false);
        }
    }

    function handlePrimaryColorChange(color) {
        const newPrimaryColor = `${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`;
        action.setStatus('primaryColor', newPrimaryColor);
        setCssVariable(newPrimaryColor, primaryTextColor);
    }

    function handlePrimaryTextColorChange(color) {
        const mewPrimaryTextColor = `${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`;
        action.setStatus('primaryTextColor', mewPrimaryTextColor);
        setCssVariable(primaryColor, mewPrimaryTextColor);
    }

    return (
        <Dialog
            className="dialog system-setting"
            visible={visible}
            title="系统设置"
            onClose={onClose}
        >
            <div className="content">
                <div className={Common.block}>
                    <p className={Common.title}>恢复</p>
                    <div>
                        <Button className={Style.button} onClick={resetThume}>
                                恢复默认主题
                        </Button>
                        <Button className={Style.button} onClick={resetSound}>
                                恢复默认提示音
                        </Button>
                    </div>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>开关</p>
                    <div className={Style.switchContainer}>
                        <div className={Style.switch}>
                            <p className={Style.switchText}>声音提醒</p>
                            <Switch
                                onChange={(value) => action.setStatus('soundSwitch', value)}
                                checked={soundSwitch}
                            />
                        </div>
                        <div className={Style.switch}>
                            <p className={Style.switchText}>桌面提醒</p>
                            <Switch
                                onChange={(value) =>
                                    action.setStatus('notificationSwitch', value)}
                                checked={notificationSwitch}
                            />
                        </div>
                        <div className={Style.switch}>
                            <p className={Style.switchText}>语音播报</p>
                            <Switch
                                onChange={(value) => action.setStatus('voiceSwitch', value)}
                                checked={voiceSwitch}
                            />
                        </div>
                        <div className={Style.switch}>
                            <p className={Style.switchText}>播报自己消息</p>
                            <Switch
                                onChange={(value) => action.setStatus('selfVoiceSwitch', value)}
                                checked={selfVoiceSwitch}
                            />
                        </div>
                    </div>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>提示音</p>
                    <div>
                        <RadioGroup
                            className={Style.radioGroup}
                            value={sound}
                            onChange={handleSelectSound}
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
                <div className={Common.block}>
                    <p className={Common.title}>
                            背景图{' '}
                        <span className={Style.backgroundTip}>
                                背景图会被拉伸到浏览器窗口大小, 合理的比例会取得更好的效果
                        </span>
                    </p>
                    <div className={Style.backgroundImageContainer}>
                        <img
                            className={`${Style.backgroundImage} ${
                                backgroundLoading ? 'blur' : ''
                            }`}
                            src={backgroundImage}
                            alt="背景图预览"
                            onClick={selectBackgroundImage}
                        />
                        <ReactLoading
                            className={`${Style.backgroundImageLoading} ${
                                backgroundLoading ? 'show' : 'hide'
                            }`}
                            type="spinningBubbles"
                            color={`rgb(${primaryColor}`}
                            height={100}
                            width={100}
                        />
                    </div>
                </div>
                {TwitterPicker && (
                    <div className={Common.block}>
                        <p className={Common.title}>主题颜色</p>
                        <div className={Style.colorInfo}>
                            <div style={{ backgroundColor: `rgb(${primaryColor})` }} />
                            <span>{`rgb(${primaryColor})`}</span>
                        </div>
                        <TwitterPicker
                            className={Style.colorPicker}
                            color={`rgb(${primaryColor})`}
                            onChange={handlePrimaryColorChange}
                        />
                    </div>
                )}
                {TwitterPicker && (
                    <div className={Common.block}>
                        <p className={Common.title}>文字颜色</p>
                        <div className={Style.colorInfo}>
                            <div style={{ backgroundColor: `rgb(${primaryTextColor})` }} />
                            <span>{`rgb(${primaryTextColor})`}</span>
                        </div>
                        <TwitterPicker
                            className={Style.colorPicker}
                            color={`rgb(${primaryTextColor})`}
                            onChange={handlePrimaryTextColorChange}
                        />
                    </div>
                )}
            </div>
        </Dialog>
    );
}

export default Setting;

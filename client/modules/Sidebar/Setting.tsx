import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Switch from 'react-switch';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import ReactLoading from 'react-loading';
import { TwitterPicker } from 'react-color';

import Dialog from '../../components/Dialog';
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
import { Tabs, TabPane, ScrollableInkTabBar, TabContent } from '../../components/Tabs';
import { LocalStorageKey } from '../../localStorage';
import themes from '../../themes';

interface SettingProps {
    visible: boolean;
    onClose: () => void;
}

type Color = {
    rgb: {
        r: number;
        g: number;
        b: number;
    }
}

function Setting(props: SettingProps) {
    const { visible, onClose } = props;

    const action = useAction();
    const soundSwitch = useSelector((state: State) => state.status.soundSwitch);
    const notificationSwitch = useSelector((state: State) => state.status.notificationSwitch);
    const voiceSwitch = useSelector((state: State) => state.status.voiceSwitch);
    const selfVoiceSwitch = useSelector((state: State) => state.status.selfVoiceSwitch);
    const sound = useSelector((state: State) => state.status.sound);
    const theme = useSelector((state: State) => state.status.theme);
    const primaryColor = useSelector((state: State) => state.status.primaryColor);
    const primaryTextColor = useSelector((state: State) => state.status.primaryTextColor);
    const backgroundImage = useSelector((state: State) => state.status.backgroundImage);
    const aero = useSelector((state: State) => state.status.aero);
    const userId = useSelector((state: State) => state.user?._id);
    const tagColorMode = useSelector((state: State) => state.status.tagColorMode);

    const [backgroundLoading, toggleBackgroundLoading] = useState(false);

    function setTheme(themeName: string) {
        action.setStatus('theme', themeName);
        // @ts-ignore
        const themeConfig = themes[themeName];
        if (themeConfig) {
            action.setStatus('primaryColor', themeConfig.primaryColor);
            action.setStatus('primaryTextColor', themeConfig.primaryTextColor);
            action.setStatus('backgroundImage', themeConfig.backgroundImage);
            action.setStatus('aero', themeConfig.aero);
            setCssVariable(themeConfig.primaryColor, themeConfig.primaryTextColor);
            window.localStorage.removeItem(LocalStorageKey.PrimaryColor);
            window.localStorage.removeItem(LocalStorageKey.PrimaryTextColor);
            window.localStorage.removeItem(LocalStorageKey.BackgroundImage);
            window.localStorage.removeItem(LocalStorageKey.Aero);
            Message.success('已修改主题');
        } else {
            window.localStorage.setItem(LocalStorageKey.PrimaryColor, primaryColor);
            window.localStorage.setItem(LocalStorageKey.PrimaryTextColor, primaryTextColor);
            window.localStorage.setItem(LocalStorageKey.BackgroundImage, backgroundImage);
            window.localStorage.setItem(LocalStorageKey.Aero, aero.toString());
        }
    }

    function handleSelectSound(newSound: string) {
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

    function handlePrimaryColorChange(color: Color) {
        const newPrimaryColor = `${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`;
        action.setStatus('primaryColor', newPrimaryColor);
        setCssVariable(newPrimaryColor, primaryTextColor);
    }

    function handlePrimaryTextColorChange(color: Color) {
        const mewPrimaryTextColor = `${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`;
        action.setStatus('primaryTextColor', mewPrimaryTextColor);
        setCssVariable(primaryColor, mewPrimaryTextColor);
    }

    return (
        <Dialog
            className={`dialog ${Style.setting}`}
            visible={visible}
            onClose={onClose}
        >
            <Tabs
                defaultActiveKey="default"
                renderTabBar={() => <ScrollableInkTabBar />}
                renderTabContent={() => <TabContent />}
            >
                <TabPane tab="功能" key="function">
                    <div className={`${Common.container} ${Style.scrollContainer}`}>
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
                            <p className={Common.title}>标签颜色</p>
                            <div>
                                <RadioGroup
                                    className={Style.TagModeRadioGroup}
                                    value={tagColorMode}
                                    onChange={(newValue: string) => action.setStatus('tagColorMode', newValue)}
                                    horizontal
                                >
                                    <RadioButton value="singleColor">单一颜色</RadioButton>
                                    <RadioButton value="fixedColor">固定颜色</RadioButton>
                                    <RadioButton value="randomColor">随机颜色</RadioButton>
                                </RadioGroup>
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="主题" key="theme">
                    <div className={`${Common.container} ${Style.scrollContainer}`}>
                        <div className={Common.block}>
                            <div>
                                <RadioGroup
                                    className={Style.TagModeRadioGroup}
                                    value={theme}
                                    onChange={(newValue: string) => setTheme(newValue)}
                                    horizontal
                                >
                                    <RadioButton value="default">默认</RadioButton>
                                    <RadioButton value="cool">清爽</RadioButton>
                                    <RadioButton value="custom">自定义</RadioButton>
                                </RadioGroup>
                            </div>
                        </div>
                        {
                            theme === 'custom'
                            && (
                                <>
                                    <div className={Common.block}>
                                        <p className={Common.title}>毛玻璃效果</p>
                                        <div>
                                            <Switch
                                                onChange={(value) => action.setStatus('aero', value)}
                                                checked={aero}
                                            />
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
                                                // @ts-ignore
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
                                                // @ts-ignore
                                                className={Style.colorPicker}
                                                color={`rgb(${primaryTextColor})`}
                                                onChange={handlePrimaryTextColorChange}
                                            />
                                        </div>
                                    )}
                                </>
                            )
                        }

                    </div>
                </TabPane>
            </Tabs>
        </Dialog>
    );
}

export default Setting;

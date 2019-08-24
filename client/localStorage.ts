import config from '../config/client';

/** LocalStorage存储的键值 */
export enum LocalStorageKey {
    PrimaryColor = 'primaryColor',
    PrimaryTextColor = 'primaryTextColor',
    BackgroundImage = 'backgroundImage',
    Sound = 'sound',
    SoundSwitch = 'soundSwitch',
    NotificationSwitch = 'notificationSwitch',
    VoiceSwitch = 'voiceSwitch',
    SelfVoiceSwitch = 'selfVoiceSwitch',
}

/**
 * 获取LocalStorage中的文本值
 * @param key 键值
 * @param defaultValue 默认值
 */
function getTextValue(key: string, defaultValue: string = '') {
    const value = window.localStorage.getItem(key);
    return value || defaultValue;
}

/**
 * 获取LocalStorage中的boolean值
 * @param key 键值
 * @param defaultValue 默认值
 */
function getSwitchValue(key: string, defaultValue: boolean = true) {
    const value = window.localStorage.getItem(key);
    return value ? value === 'true' : defaultValue;
}

/**
 * 获取LocalStorage值
 */
export default function getData() {
    return {
        primaryColor: getTextValue(LocalStorageKey.PrimaryColor, config.primaryColor),
        primaryTextColor: getTextValue(LocalStorageKey.PrimaryTextColor, config.primaryTextColor),
        backgroundImage: getTextValue(LocalStorageKey.BackgroundImage, config.backgroundImage),
        sound: getTextValue(LocalStorageKey.Sound, config.sound),
        soundSwitch: getSwitchValue(LocalStorageKey.SoundSwitch),
        notificationSwitch: getSwitchValue(LocalStorageKey.NotificationSwitch),
        voiceSwitch: getSwitchValue(LocalStorageKey.VoiceSwitch),
        selfVoiceSwitch: getSwitchValue(LocalStorageKey.SelfVoiceSwitch, false),
    };
}

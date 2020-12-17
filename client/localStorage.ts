import config from '../config/client';
import themes from './themes';

/** LocalStorage存储的键值 */
export enum LocalStorageKey {
    Theme = 'theme',
    PrimaryColor = 'primaryColor',
    PrimaryTextColor = 'primaryTextColor',
    BackgroundImage = 'backgroundImage',
    Aero = 'aero',
    Sound = 'sound',
    SoundSwitch = 'soundSwitch',
    NotificationSwitch = 'notificationSwitch',
    VoiceSwitch = 'voiceSwitch',
    SelfVoiceSwitch = 'selfVoiceSwitch',
    TagColorMode = 'tagColorMode',
    EnableSearchExpression = 'enableSearchExpression',
}

/**
 * 获取LocalStorage中的文本值
 * @param key 键值
 * @param defaultValue 默认值
 */
function getTextValue(key: string, defaultValue: string) {
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
    const theme = getTextValue(LocalStorageKey.Theme, config.defaultTheme);
    let themeConfig = {
        primaryColor: '',
        primaryTextColor: '',
        backgroundImage: '',
        aero: false,
    };
    // @ts-ignore
    if (theme && themes[theme]) {
        // @ts-ignore
        themeConfig = themes[theme];
    } else {
        themeConfig = {
            primaryColor: getTextValue(
                LocalStorageKey.PrimaryColor,
                themes[config.defaultTheme]?.primaryColor,
            ),
            primaryTextColor: getTextValue(
                LocalStorageKey.PrimaryTextColor,
                themes[config.defaultTheme]?.primaryTextColor,
            ),
            backgroundImage: getTextValue(
                LocalStorageKey.BackgroundImage,
                themes[config.defaultTheme]?.backgroundImage,
            ),
            aero: getSwitchValue(LocalStorageKey.Aero, false),
        };
    }
    return {
        theme,
        ...themeConfig,
        sound: getTextValue(LocalStorageKey.Sound, config.sound),
        soundSwitch: getSwitchValue(LocalStorageKey.SoundSwitch),
        notificationSwitch: getSwitchValue(LocalStorageKey.NotificationSwitch),
        voiceSwitch: getSwitchValue(LocalStorageKey.VoiceSwitch),
        selfVoiceSwitch: getSwitchValue(LocalStorageKey.SelfVoiceSwitch, false),
        tagColorMode: getTextValue(LocalStorageKey.TagColorMode, config.tagColorMode),
        enableSearchExpression: getSwitchValue(LocalStorageKey.EnableSearchExpression, false),
    };
}

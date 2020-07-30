import config from '../config/client';

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
    if (theme && config.theme[theme]) {
        // @ts-ignore
        themeConfig = config.theme[theme];
    } else {
        themeConfig = {
            primaryColor: getTextValue(
                LocalStorageKey.PrimaryColor,
                config.theme[config.defaultTheme].primaryColor,
            ),
            primaryTextColor: getTextValue(
                LocalStorageKey.PrimaryTextColor,
                config.theme[config.defaultTheme].primaryTextColor,
            ),
            backgroundImage: getTextValue(
                LocalStorageKey.BackgroundImage,
                config.theme[config.defaultTheme].backgroundImage,
            ),
            aero: getSwitchValue(
                LocalStorageKey.Aero,
                false,
            ),
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
    };
}

import { MB } from '../utils/const';

export default {
    server:
        process.env.Server || (process.env.NODE_ENV === 'development' ? '//localhost:9200' : '/'),

    maxImageSize: process.env.MaxImageSize ? parseInt(process.env.MaxImageSize, 10) : MB * 3,
    maxBackgroundImageSize: process.env.MaxBackgroundImageSize
        ? parseInt(process.env.MaxBackgroundImageSize, 10)
        : MB * 5,
    maxAvatarSize: process.env.MaxAvatarSize ? parseInt(process.env.MaxAvatarSize, 10) : MB * 1.5,
    maxFileSize: process.env.MaxFileSize ? parseInt(process.env.MaxFileSize, 10) : MB * 10,

    // client default system setting
    defaultTheme: process.env.DefaultTheme || 'cool',
    sound: process.env.Sound || 'default',
    tagColorMode: process.env.TagColorMode || 'fixedColor',

    /**
     * 前端监控: https://yueying.effirst.com/index
     * 值为监控应用id, 为空则不启用监控
     */
    frontendMonitorAppId: process.env.FrontendMonitorAppId || '',
};

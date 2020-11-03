import serverConfig from './server';
import { MB } from '../utils/const';

const { env } = process;

const theme: { [theme: string]: any } = {
    default: {
        primaryColor: '74, 144, 226',
        primaryTextColor: '247, 247, 247',
        backgroundImage: require('../client/assets/images/background.jpg'),
        aero: false,
    },
    cool: {
        primaryColor: '5,159,149',
        primaryTextColor: '255, 255, 255',
        backgroundImage: require('../client/assets/images/background-cool.jpg'),
        aero: false,
    },
};

export default {
    server: env.SERVER || `//${serverConfig.host}:${serverConfig.port}`,

    maxImageSize: env.MAX_IMAGE_SIZE ? parseInt(env.MAX_IMAGE_SIZE, 10) : MB * 3,
    maxBackgroundImageSize: env.MAX_BACKGROUND_IMAGE_SIZE
        ? parseInt(env.MAX_BACKGROUND_IMAGE_SIZE, 10)
        : MB * 5,
    maxAvatarSize: env.MAX_AVATAR_SIZE ? parseInt(env.MAX_AVATAR_SIZE, 10) : MB * 1.5,

    // client default system setting
    theme,
    defaultTheme: env.DEFAULT_THEME && theme[env.DEFAULT_THEME] ? env.DEFAULT_THEME : 'cool',

    sound: env.SOUND || 'default',
    tagColorMode: env.TAG_COLOR_MODE || 'fixedColor',

    /**
     * 前端监控: https://yueying.effirst.com/index
     * 值为监控应用id, 为空则不启用监控
     */
    frontendMonitorAppId: env.FRONT_END_MONITOR_APP_ID || '',
};

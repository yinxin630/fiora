import { Platform } from 'react-native';
import Constants from 'expo-constants';
// eslint-disable-next-line import/extensions
import packageInfo from '../../app.json';

const os = Platform.OS === 'ios' ? 'iOS' : 'Android';

export const isiOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export default {
    os,
    browser: 'App',
    environment: `App ${
        process.env.NODE_ENV === 'development'
            ? '开发版'
            : packageInfo.expo.version
    } on ${os} ${
        isiOS ? Constants.platform?.ios?.systemVersion : Constants.systemVersion
    } ${isiOS ? Constants.platform?.ios?.model : ''}`,
};

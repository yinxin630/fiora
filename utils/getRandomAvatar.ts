import webpackConfig from '../config/webpack';

const AvatarCount = 15;
const env = process.env.NODE_ENV === 'development' ? 'dev' : 'build';
const publicPath: string = webpackConfig[env].assetsPublicPath + (webpackConfig[env].assetsPublicPath.endsWith('/') ? '' : '/');

/**
 * 获取随机头像
 */
export default function getRandomAvatar() {
    const number = Math.floor(Math.random() * AvatarCount);
    return `${publicPath}avatar/${number}.jpg`;
}

/**
 * 获取默认头像
 */
export function getDefaultAvatar() {
    return `${publicPath}avatar/0.jpg`;
}

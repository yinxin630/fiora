import webpackConfig from '../config/webpack';

const AvatarCount = 15;
const env = process.env.NODE_ENV === 'development' ? 'dev' : 'build';
const publishPath = webpackConfig[env].assetsPublicPath;

/**
 * 获取随机头像
 */
export default function getRandomAvatar() {
    const number = Math.floor(Math.random() * AvatarCount);
    return `${publishPath}avatar/${number}.jpg`;
}

/**
 * 获取默认头像
 */
export function getDefaultAvatar() {
    return `${publishPath}avatar/0.jpg`;
}

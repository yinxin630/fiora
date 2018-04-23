const webpackConfig = require('../config/webpack');

const AvatarCount = 14;
const env = process.env.NODE_ENV === 'development' ? 'dev' : 'build';
const publishPath = webpackConfig[env].assetsPublicPath + webpackConfig[env].assetsSubDirectory;

module.exports = function getRandomAvatar() {
    const number = Math.ceil(Math.random() * AvatarCount);
    return `${publishPath}/avatar/${number}.jpg`;
};

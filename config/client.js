const options = require('../utils/commandOptions');

export default {
    server: options.server || '//localhost:9200',

    maxImageSize: 1024 * 1024 * 1,
    maxBackgroundImageSize: 1024 * 1024 * 3,

    // client default system setting
    primaryColor: '74, 144, 226',
    primaryTextColor: '247, 247, 247',
    backgroundImage: require('@/assets/images/background.jpg'),
    sound: 'default',
};


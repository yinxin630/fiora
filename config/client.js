export default {
    server: process.env.NODE_ENV === 'development' ? '//localhost:9200' : '',

    maxImageSize: 1024 * 1024 * 3,
    maxBackgroundImageSize: 1024 * 1024 * 5,

    // client default system setting
    primaryColor: '74, 144, 226',
    primaryTextColor: '247, 247, 247',
    backgroundImage: require('@/assets/images/background.jpg'),
    sound: 'default',
};


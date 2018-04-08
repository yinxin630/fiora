module.exports = {
    // service port
    port: 9200,

    // mongodb config
    database: 'mongodb://127.0.0.1:27017/new-fiora',

    // jwt encryption secret
    jwtSecret: 'jwtSecret',

    // token expires time
    tokenExpiresTime: 1000 * 60 * 60 * 24 * 30,

    // default group avatar url
    defaultGroupAvatar: '/static/default_group_avatar.png',
    // default user avatar url
    defaultUserAvatar: '/static/default_user_avatar.png',
};

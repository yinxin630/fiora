import ip from 'ip';

const { env } = process;

export default {
    /** 服务端host, 默认为本机ip地址(可能会是局域网地址) */
    host: env.HOST || ip.address(),

    // service port
    port: env.PORT ? parseInt(env.PORT, 10) : 9200,

    // mongodb address
    database: env.DATABASE || 'mongodb://localhost:27017/fiora',

    // jwt encryption secret
    jwtSecret: env.JWT_SECRET || 'jwtSecret',

    // Maximize the number of groups
    maxGroupsCount: env.MAX_GROUP_COUNT ? parseInt(env.MAX_GROUP_COUNT, 10) : 3,

    // qiniu config
    qiniuAccessKey: env.QINIU_ACCESS_KEY || '',
    qiniuSecretKey: env.QINIU_SECRET_KEY || '',
    qiniuBucket: env.QINIU_BUCKET || '',
    qiniuUrlPrefix: env.QINIU_URL_PREFIX || '',

    allowOrigin: env.ALLOW_ORIGIN ? env.ALLOW_ORIGIN.split(',') : null,

    // token expires time
    tokenExpiresTime: env.TOKEN_EXPIRES_TIME
        ? parseInt(env.TOKEN_EXPIRES_TIME, 10)
        : 1000 * 60 * 60 * 24 * 30,

    // administrator user id
    administrator: env.ADMINISTRATOR || '',

    // default group name
    defaultGroupName: env.DEFAULT_GROUP_NAME || 'fiora',

    /** 禁用注册功能 */
    disableRegister: env.DISABLE_REGISTER ? env.DISABLE_REGISTER === 'true' : false,

    /** disable user create new group */
    disableCreateGroup: env.DISABLE_CREATE_GROUP ? env.DISABLE_CREATE_GROUP === 'true' : false,
};

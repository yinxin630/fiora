import ip from 'ip';
import options from '../utils/commandOptions';

const { env } = process;

export default {
    /** 服务端host, 默认为本机ip地址(可能会是局域网地址) */
    host: options.host || env.Host || ip.address(),

    // service port
    port: options.port || env.Port || 9200,

    // mongodb address
    database: options.database || env.Database || 'mongodb://localhost:27017/fiora',

    // jwt encryption secret
    jwtSecret: options.jwtSecret || env.JwtSecret || 'jwtSecret',

    // Maximize the number of groups
    maxGroupsCount: 3,

    // qiniu config
    qiniuAccessKey: options.qiniuAccessKey || env.QiniuAccessKey || '',
    qiniuSecretKey: options.qiniuSecretKey || env.QiniuSecretKey || '',
    qiniuBucket: options.qiniuBucket || env.QiniuBucket || '',
    qiniuUrlPrefix: options.qiniuUrlPrefix || env.QiniuUrlPrefix || '',

    allowOrigin: options.allowOrigin || env.AllowOrigin,

    // token expires time
    tokenExpiresTime: 1000 * 60 * 60 * 24 * 7,

    // administrator user id
    administrator: options.administrator || env.Administrator || '',

    // default group name
    defaultGroupName: 'fiora',

    /** 禁用注册功能 */
    disableRegister: false,
};

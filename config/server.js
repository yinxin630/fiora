const commandLineArgs = require('command-line-args');

const optionDefinitions = [
    { name: 'database', type: String },
    { name: 'jwtSecret', type: String },
    { name: 'qiniuAccessKey', type: String },
    { name: 'qiniuSecretKey', type: String },
    { name: 'qiniuBucket', type: String },
    { name: 'qiniuUrlPrefix', type: String },
];
const options = commandLineArgs(optionDefinitions);

module.exports = {
    // service port
    port: 9200,

    // mongodb address
    database: options.database || 'mongodb://localhost:27017/fiora',

    // jwt encryption secret
    jwtSecret: options.jwtSecret || 'jwtSecret',

    // Maximize the number of groups
    maxGroupsCount: 3,

    // qiniu config
    qiniuAccessKey: options.qiniuAccessKey || '',
    qiniuSecretKey: options.qiniuSecretKey || '',
    qiniuBucket: options.qiniuBucket || '',
    qiniuUrlPrefix: options.qiniuUrlPrefix || '',

    allowOrigin: ['localhost:8080'],

    // token expires time
    tokenExpiresTime: 1000 * 60 * 60 * 24 * 30,
};

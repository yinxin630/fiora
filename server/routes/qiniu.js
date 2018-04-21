const qiniu = require('qiniu');
const assert = require('assert');
const config = require('../../config/server');

const mac = new qiniu.auth.digest.Mac(config.qiniuAccessKey, config.qiniuSecretKey);
const options = {
    scope: config.qiniuBucket,
    expires: 60,
};
const configNotEmpty = config.qiniuAccessKey !== '' && config.qiniuSecretKey !== '' && config.qiniuBucket !== '' && config.qiniuUrlPrefix !== 0;

module.exports = {
    async uploadToken() {
        assert(configNotEmpty, '缺少七牛信息, 请检查服务器配置');

        const putPolicy = new qiniu.rs.PutPolicy(options);
        const uploadToken = putPolicy.uploadToken(mac);
        return {
            token: uploadToken,
            urlPrefix: config.qiniuUrlPrefix,
        };
    },
};

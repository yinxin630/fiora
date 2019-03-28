const qiniu = require('qiniu');
const config = require('../../config/server');

const mac = new qiniu.auth.digest.Mac(config.qiniuAccessKey, config.qiniuSecretKey);
const options = {
    scope: config.qiniuBucket,
    expires: 60,
};
const configNotEmpty = config.qiniuAccessKey !== '' && config.qiniuSecretKey !== '' && config.qiniuBucket !== '' && config.qiniuUrlPrefix !== '';

module.exports = {
    async uploadToken() {
        if (configNotEmpty) {
            const putPolicy = new qiniu.rs.PutPolicy(options);
            const uploadToken = putPolicy.uploadToken(mac);
            return {
                token: uploadToken,
                urlPrefix: config.qiniuUrlPrefix,
            };
        }
        return {
            useUploadFile: true,
        };
    },
};

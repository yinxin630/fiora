import qiniu from 'qiniu';
import config from '../../config/server';

const mac = new qiniu.auth.digest.Mac(config.qiniuAccessKey, config.qiniuSecretKey);
const options = {
    scope: config.qiniuBucket,
    expires: 60,
};
const configNotEmpty = [
    config.qiniuAccessKey,
    config.qiniuSecretKey,
    config.qiniuBucket,
    config.qiniuUrlPrefix,
].every(Boolean);

/**
 * 获取七牛上传token
 */
// eslint-disable-next-line import/prefer-default-export
export async function uploadToken() {
    if (configNotEmpty) {
        const putPolicy = new qiniu.rs.PutPolicy(options);
        const token = putPolicy.uploadToken(mac);
        return {
            token,
            urlPrefix: config.qiniuUrlPrefix,
        };
    }
    return {
        useUploadFile: true,
    };
}

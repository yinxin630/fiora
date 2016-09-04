const qiniu = require('qiniu');
const promise = require('bluebird');
const config = require('../../../config/config');

qiniu.conf.ACCESS_KEY = config.accessKey;
qiniu.conf.SECRET_KEY = config.secretKey;

function uptoken(bucket, key) {
    return new qiniu.rs.PutPolicy(`${bucket}:${key}`).token();
}

function uploadFile(key, localFile) {
    const extra = new qiniu.io.PutExtra();
    return new promise((resolve, reject) => {
        qiniu.io.putFile(uptoken(config.bucket, key), key, localFile, extra, (err, ret) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(ret);
            }
        });
    });
}

module.exports = uploadFile;

const path = require('path');
const fs = require('fs');
const promise = require('bluebird');
const http = require('http');

const config = require('../../../config/config');
const qiniu = require('./qiniu');

module.exports = {
    saveImageData: function* (fileName, imageData) {
        const fileSavePath = path.join(__dirname, `../../../public/images/${fileName}`);

        // save to local disk
        yield promise.promisify(fs.writeFile)(
            fileSavePath,
            imageData.replace(/^data:image\/(.+);base64,/, ''),
            'base64'
        );

        // if have qiniu config. push file to qiniu
        if (config.bucket === 'bucket_name' || config.accessKey === 'qiniu_access_key' || config.secretKey === 'qiniu_secret_key') {
            return `/images/${fileName}`;
        }
        else {
            yield qiniu(fileName, fileSavePath);
            fs.unlinkSync(fileSavePath);
            return `http://${config.bucketUrl}/${fileName}`;
        }
    },

    // don't use this function
    saveImageUrl: function* (fileName, imageUrl) {
        if (/^https/.test(imageUrl)) {
            return imageUrl;
        }
        const fileSavePath = path.join(__dirname, `../../../public/images/${fileName}`);
        const file = fs.createWriteStream(fileSavePath);

        // save to local disk
        const response = yield promise.promisify(http.get)(imageUrl);
        response.pipe(file);

        // if have qiniu config. push file to qiniu
        if (config.bucket === 'bucket_name' || config.accessKey === 'qiniu_access_key' || config.secretKey === 'qiniu_secret_key') {
            return `/images/${fileName}`;
        }
        else {
            yield qiniu(fileName, fileSavePath);
            fs.unlinkSync(fileSavePath);
            return `http://${config.bucketUrl}/${fileName}`;
        }
    },
};

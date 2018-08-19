import * as qiniu from 'qiniu-js';
import fetch from './fetch';

export default function uploadFile(blob, qiniuKey, fileName, qiniuNextEventCallback) {
    return new Promise(async (resolve, reject) => {
        const [getTokenErr, tokenRes] = await fetch('uploadToken');
        if (getTokenErr) {
            return reject(getTokenErr);
        }

        if (tokenRes.useUploadFile === true) {
            const [uploadErr, result] = await fetch('uploadFile', {
                file: blob,
                fileName,
            });
            if (uploadErr) {
                return reject(uploadErr);
            }
            resolve(result.url);
        } else {
            const result = qiniu.upload(blob, qiniuKey, tokenRes.token, { useCdnDomain: true }, {});
            result.subscribe({
                next: (info) => {
                    if (qiniuNextEventCallback) {
                        qiniuNextEventCallback(info);
                    }
                },
                error: (qiniuErr) => {
                    reject(qiniuErr);
                },
                complete: async (info) => {
                    const imageUrl = `${tokenRes.urlPrefix + info.key}`;
                    resolve(imageUrl);
                },
            });
        }
    });
}

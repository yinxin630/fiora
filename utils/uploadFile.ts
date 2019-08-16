import * as qiniu from 'qiniu-js';
import fetch from './fetch';

/**
 * 上传文件到七牛
 * @param {string} blob 文件blob数据
 * @param {string} qiniuKey 七牛文件key
 * @param {string} fileName 文件名
 * @param {Function} qiniuNextEventCallback 七牛上传进度回调
 */
export default async function uploadFile(blob, qiniuKey, fileName, qiniuNextEventCallback) {
    // 获取七牛上传token
    const [getTokenErr, tokenRes] = await fetch('uploadToken');
    if (getTokenErr) {
        throw Error(getTokenErr);
    }

    // 服务端返回标识, 说明七牛不可用, 则上传文件到服务端
    if (tokenRes.useUploadFile === true) {
        const [uploadErr, result] = await fetch('uploadFile', {
            file: blob,
            fileName,
        });
        if (uploadErr) {
            throw Error(uploadErr);
        }
        return result.url;
    }

    // 七牛可用, 上传到七牛
    return new Promise((resolve, reject) => {
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
    });
}

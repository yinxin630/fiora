import * as OSS from 'ali-oss';
import fetch from './fetch';

let ossClient: OSS;
let endpoint = '/';
export async function initOSS() {
    const [, token] = await fetch('getSTS');
    if (token?.enable) {
        // @ts-ignore
        ossClient = new OSS({
            region: token.region,
            accessKeyId: token.AccessKeyId,
            accessKeySecret: token.AccessKeySecret,
            stsToken: token.SecurityToken,
            bucket: token.bucket,
        });
        if (token.endpoint) {
            endpoint = `//${token.endpoint}/`;
        }

        const OneHour = 1000 * 60 * 60;
        setInterval(async () => {
            const [, refreshToken] = await fetch('getSTS');
            if (refreshToken?.enable) {
                // @ts-ignore
                ossClient = new OSS({
                    region: refreshToken.region,
                    accessKeyId: refreshToken.AccessKeyId,
                    accessKeySecret: refreshToken.AccessKeySecret,
                    stsToken: refreshToken.SecurityToken,
                    bucket: refreshToken.bucket,
                });
            }
        }, OneHour);
    }
}

export function getOSSFileUrl(url = '', process = '') {
    const [rawUrl = '', extraPrams = ''] = url.split('?');
    if (ossClient && rawUrl.startsWith('oss:')) {
        const filename = rawUrl.slice(4);
        // expire 5min
        return `${ossClient.signatureUrl(filename, { expires: 300, process })}${
            extraPrams ? `&${extraPrams}` : ''
        }`;
    }
    if (/\/\/cdn\.suisuijiang\.com/.test(rawUrl)) {
        return `${rawUrl}?x-oss-process=${process}${
            extraPrams ? `&${extraPrams}` : ''
        }`;
    }
    return `${url}`;
}

/**
 * 上传文件
 * @param blob 文件blob数据
 * @param fileName 文件名
 */
export default async function uploadFile(
    blob: Blob,
    fileName: string,
): Promise<string> {
    // 阿里云 OSS 不可用, 上传文件到服务端
    if (!ossClient) {
        const [uploadErr, result] = await fetch('uploadFile', {
            file: blob,
            fileName,
        });
        if (uploadErr) {
            throw Error(uploadErr);
        }
        return result.url;
    }

    // 上传到阿里OSS
    const result = await ossClient.put(fileName, blob);
    if (result.res.status === 200) {
        return endpoint + result.name;
    }
    return Promise.reject('上传文件失败');
}

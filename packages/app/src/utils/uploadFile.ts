import fetch from './fetch';

/**
 * 上传文件
 * @param blob 文件blob数据
 * @param fileName 文件名
 */
export default async function uploadFile(
    blob: Blob | string,
    fileName: string,
    isBase64 = false,
): Promise<string> {
    const [uploadErr, result] = await fetch('uploadFile', {
        file: blob,
        fileName,
        isBase64,
    });
    if (uploadErr) {
        throw Error(`上传图片失败::${uploadErr}`);
    }
    return result.url;
}

export function getOSSFileUrl(url: string | number = '', process = '') {
    if (typeof url === 'number') {
        return url;
    }
    const [rawUrl = '', extraPrams = ''] = url.split('?');
    if (/^\/\/cdn\.suisuijiang\.com/.test(rawUrl)) {
        return `https:${rawUrl}?x-oss-process=${process}${extraPrams ? `&${extraPrams}` : ''}`;
    }
    if (url.startsWith('//')) {
        return `https:${url}`;
    }
    if (url.startsWith('/')) {
        return `https://fiora.suisuijiang.com${url}`;
    }
    return `${url}`;
}

/**
 * 压缩图片
 * @param image 要压缩的图片
 * @param mimeType mime类型
 * @param quality 质量
 */
export default function compressImage(
    image: HTMLImageElement,
    mimeType: string,
    quality = 1,
): Promise<Blob | null> {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(image, 0, 0);
            canvas.toBlob(resolve, mimeType, quality);
        } else {
            resolve(null);
        }
    });
}

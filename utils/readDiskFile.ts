interface ReadFileResult {
    /** 文件名 */
    filename: string;
    /** 文件拓展名 */
    ext: string;
    /** 文件类型 */
    type: string;
    /** 文件内容 */
    result: Blob | ArrayBuffer | string;
    /** 文件长度 */
    length: number;
}

/**
 * 读取本地文件
 * @param {string} resultType 数据类型, {blob|base64}, 默认blob
 * @param {string} accept 可选文件类型, 默认 * / *
 */
export default async function readDiskFIle(resultType = 'blob', accept = '*/*') {
    const result: ReadFileResult = await new Promise((resolve) => {
        const $input = document.createElement('input');
        $input.style.display = 'none';
        $input.setAttribute('type', 'file');
        $input.setAttribute('accept', accept);
        // 判断用户是否点击取消, 原生没有提供专门事件, 用hack的方法实现
        $input.onclick = () => {
            $input.value = null;
            document.body.onfocus = () => {
                // onfocus事件会比$input.onchange事件先触发, 因此需要延迟一段时间
                setTimeout(() => {
                    if ($input.value.length === 0) {
                        resolve(null);
                    }
                    document.body.onfocus = null;
                }, 500);
            };
        };
        $input.onchange = (e: Event) => {
            const file = e.target.files[0];
            if (!file) {
                return;
            }

            const reader = new FileReader();
            reader.onloadend = function handleLoad() {
                resolve({
                    filename: file.name,
                    ext: file.name
                        .split('.')
                        .pop()
                        .toLowerCase(),
                    type: file.type,
                    result: this.result,
                    length:
                        resultType === 'blob'
                            ? (this.result as ArrayBuffer).byteLength
                            : (this.result as string).length,
                });
            };

            switch (resultType) {
                case 'blob': {
                    reader.readAsArrayBuffer(file);
                    break;
                }
                case 'base64': {
                    reader.readAsDataURL(file);
                    break;
                }
                default: {
                    reader.readAsArrayBuffer(file);
                }
            }
        };
        $input.click();
    });

    if (result && resultType === 'blob') {
        result.result = new Blob([new Uint8Array(result.result as ArrayBuffer)], {
            type: result.type,
        });
    }
    return result;
}

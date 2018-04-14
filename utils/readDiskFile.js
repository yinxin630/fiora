export default async function readDiskFIle(resultType = 'blob', accept = '*/*') {
    const result = await new Promise((resolve) => {
        const $input = document.createElement('input');
        $input.style.display = 'none';
        $input.setAttribute('type', 'file');
        $input.setAttribute('accept', accept);
        $input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) {
                return;
            }

            const reader = new FileReader();
            reader.onloadend = function () {
                resolve({
                    filename: file.name,
                    ext: file.name.split('.').pop().toLowerCase(),
                    type: file.type,
                    result: this.result,
                    length: resultType === 'blob' ? this.result.byteLength : this.result.length,
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

    if (resultType === 'blob') {
        result.result = new Blob([new Uint8Array(result.result)], { type: result.type });
    }
    return result;
}

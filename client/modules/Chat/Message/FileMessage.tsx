import React from 'react';
import { css } from 'linaria';

const styles = {
    container: css`
        display: block;
        min-width: 160px;
        max-width: 240px;
        padding: 0 4px;
        text-align: center;
        cursor: pointer;
        color: var(--primary-text-color-10);
        text-decoration: none;
    `,
    fileInfo: css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #eee;
    `,
    button: css`
        display: inline-block;
        font-size: 12px;
        text-align: center;
        margin-top: 6px;
    `,
};

type Props = {
    file: string;
    percent: number;
};

function FileMessage({ file, percent }: Props) {
    const { fileUrl, filename, size } = JSON.parse(file);
    let fileSize = `${size}B`;
    if (size > 1024 * 1024) {
        fileSize = `${Math.ceil((size / 1024 / 1024) * 100) / 100}KB`;
    } else if (size > 1024) {
        fileSize = `${Math.ceil((size / 1024) * 100) / 100}KB`;
    }

    return (
        <a
            className={styles.container}
            {...(fileUrl ? { href: fileUrl, download: filename, target: '_blank' } : {})}
        >
            <div className={styles.fileInfo}>
                <span>{filename}</span>
                <span>{fileSize}</span>
            </div>
            <p className={styles.button}>
                {percent === undefined || percent >= 100
                    ? '下载'
                    : `上传中... ${percent.toFixed(0)}%`}
            </p>
        </a>
    );
}

export default React.memo(FileMessage);

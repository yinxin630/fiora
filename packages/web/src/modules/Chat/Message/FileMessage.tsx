import React from 'react';
import { css } from 'linaria';
import filesize from 'filesize';
import { getOSSFileUrl } from '../../../utils/uploadFile';

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
    fileInfoText: css`
        word-break: break-all;
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
    const url = fileUrl && getOSSFileUrl(fileUrl);

    return (
        <a
            className={styles.container}
            {...(fileUrl
                ? { href: url, download: filename, target: '_blank' }
                : {})}
        >
            <div className={styles.fileInfo}>
                <span className={styles.fileInfoText}>{filename}</span>
                <span className={styles.fileInfoText}>{filesize(size)}</span>
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

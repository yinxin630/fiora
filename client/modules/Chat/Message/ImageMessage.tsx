import React, { useState, useCallback } from 'react';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';

import Style from './Message.less';
import { CircleProgress } from '../../../components/Progress';
import { isMobile } from '../../../../utils/ua';

interface ImageMessageProps {
    src: string;
    loading: boolean;
    percent: number;
}

function ImageMessage(props: ImageMessageProps) {
    const { src, loading, percent } = props;

    const [viewer, toggleViewer] = useState(false);
    const closeViewer = useCallback(() => toggleViewer(false), []);

    let imageSrc = src;
    const containerWidth = 450;
    const maxWidth = containerWidth - 100 > 500 ? 500 : containerWidth - 100;
    const maxHeight = 200;
    let width = 200;
    let height = 200;
    const parseResult = /width=([0-9]+)&height=([0-9]+)/.exec(src);
    if (parseResult) {
        const natureWidth = +parseResult[1];
        const naturehHeight = +parseResult[2];
        let scale = 1;
        if (natureWidth * scale > maxWidth) {
            scale = maxWidth / natureWidth;
        }
        if (naturehHeight * scale > maxHeight) {
            scale = maxHeight / naturehHeight;
        }
        width = natureWidth * scale;
        height = naturehHeight * scale;
        imageSrc = /^(blob|data):/.test(src)
            ? imageSrc.split('?')[0]
            : `${imageSrc}&imageView2/3/w/${Math.floor(width * 1.2)}/h/${Math.floor(
                height * 1.2,
            )}`;
    }

    let className = Style.imageMessage;
    if (loading) {
        className += ` ${Style.iamgeLoading}`;
    }
    if (/huaji=true/.test(imageSrc)) {
        className += ` ${Style.huaji}`;
    }

    return (
        <div
            className={className}
        >
            {(
                // @ts-ignore
                <img
                    className={Style.image}
                    src={imageSrc}
                    alt="消息图片"
                    width={width}
                    height={height}
                    onClick={() => isMobile && toggleViewer(true)}
                    onDoubleClick={() => !isMobile && toggleViewer(true)}
                    referrerPolicy="no-referrer"
                />
            )}
            <CircleProgress
                className={Style.imageProgress}
                percent={percent}
                strokeWidth={5}
                strokeColor="#a0c672"
                trailWidth={5}
            />
            <div className={`${Style.imageProgress} ${Style.imageProgressNumber}`}>{Math.ceil(percent)}%</div>
            <Viewer
                // eslint-disable-next-line react/destructuring-assignment
                visible={viewer}
                onClose={closeViewer}
                onMaskClick={closeViewer}
                images={[{ src, alt: src }]}
                noNavbar
            />
        </div>
    );
}

export default ImageMessage;

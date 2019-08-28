import React, { useState, useCallback, useEffect, useRef } from 'react';

import Style from './Message.less';
import { CircleProgress } from '../../../components/Progress';
import { isMobile } from '../../../../utils/ua';

let Viewer: any = null;

interface ImageMessageProps {
    src: string;
    loading: boolean;
    percent: number;
}

function ImageMessage(props: ImageMessageProps) {
    const { src, loading, percent } = props;

    const [viewer, toggleViewer] = useState(false);
    const closeViewer = useCallback(() => toggleViewer(false), []);
    const [timestamp, setTimestamp] = useState(0);
    const $container = useRef(null);

    useEffect(() => {
        (async () => {
            if (viewer && !Viewer) {
                // @ts-ignore
                const reactViewerModule = await import(
                    /* webpackChunkName: "react-viewer" */ 'react-viewer',
                );
                // @ts-ignore
                await import(/* webpackChunkName: "react-viewer.css" */ 'react-viewer/dist/index.css');
                Viewer = reactViewerModule.default;
                setTimestamp(Date.now());
            }
        })();
    }, [viewer]);

    let imageSrc = src;
    const containerWidth = isMobile ? window.innerWidth - 50 : 450;
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
            : `${imageSrc}&imageView2/3/w/${Math.floor(width * 1.2)}/h/${Math.floor(height * 1.2)}`;
    }

    let className = Style.imageMessage;
    if (loading) {
        className += ` ${Style.iamgeLoading}`;
    }
    if (/huaji=true/.test(imageSrc)) {
        className += ` ${Style.huaji}`;
    }

    return (
        <>
            <div className={className} ref={$container}>
                {
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
                }
                <CircleProgress
                    className={Style.imageProgress}
                    percent={percent}
                    strokeWidth={5}
                    strokeColor="#a0c672"
                    trailWidth={5}
                />
                <div className={`${Style.imageProgress} ${Style.imageProgressNumber}`}>
                    {Math.ceil(percent)}%
                </div>
                {Viewer && (
                    <Viewer
                        // eslint-disable-next-line react/destructuring-assignment
                        visible={viewer}
                        onClose={closeViewer}
                        onMaskClick={closeViewer}
                        images={[{ src, alt: src }]}
                        noNavbar
                    />
                )}
            </div>
            <span className="hide">{timestamp}</span>
        </>
    );
}

export default ImageMessage;

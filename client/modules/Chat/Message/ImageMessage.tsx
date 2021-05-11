import React, { useState, useCallback, useRef, MouseEvent } from 'react';
import loadable from '@loadable/component';

import Style from './Message.less';
import { CircleProgress } from '../../../components/Progress';
import { isMobile } from '../../../../utils/ua';
import { getOSSFileUrl } from '../../../../utils/uploadFile';

// @ts-ignore
const ReactViewerAsync = loadable(async () => import(/* webpackChunkName: "react-viewer" */ 'react-viewer'));

interface ImageMessageProps {
    src: string;
    loading: boolean;
    percent: number;
}

function ImageMessage(props: ImageMessageProps) {
    const { src, loading, percent } = props;

    const [viewer, toggleViewer] = useState(false);
    const closeViewer = useCallback(() => toggleViewer(false), []);
    const $container = useRef(null);

    let imageSrc = getOSSFileUrl(src);
    const containerWidth = isMobile ? window.innerWidth - 25 - 50 : 450;
    const maxWidth = containerWidth - 100 > 500 ? 500 : containerWidth - 100;
    const maxHeight = 200;
    let width = 200;
    let height = 200;
    const parseResult = /width=([0-9]+)&height=([0-9]+)/.exec(imageSrc);
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
        imageSrc = /^(blob|data):/.test(imageSrc)
            ? imageSrc.split('?')[0]
            : `${imageSrc}`;
    }

    let className = Style.imageMessage;
    if (loading) {
        className += ` ${Style.iamgeLoading}`;
    }
    if (/huaji=true/.test(imageSrc)) {
        className += ` ${Style.huaji}`;
    }

    function handleImageViewerMaskClick(e: MouseEvent) {
        // @ts-ignore
        if (e.target?.tagName !== 'IMG') {
            closeViewer();
        }
    }

    return (
        <>
            <div className={className} ref={$container}>
                <img
                    className={Style.image}
                    src={imageSrc}
                    alt="消息图片"
                    width={width}
                    height={height}
                    onClick={() => toggleViewer(true)}
                />
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
                {viewer && (
                    <ReactViewerAsync
                        // eslint-disable-next-line react/destructuring-assignment
                        visible={viewer}
                        onClose={closeViewer}
                        onMaskClick={handleImageViewerMaskClick}
                        images={[{ src: `${src}&imageView2/1/q/80`, alt: src }]}
                        noNavbar
                    />
                )}
            </div>
        </>
    );
}

export default React.memo(ImageMessage);

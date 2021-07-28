import React from 'react';
import { Image as BaseImage, ImageSourcePropType } from 'react-native';
import { getOSSFileUrl } from '../utils/uploadFile';
import { referer } from '../utils/constant';

type Props = {
    src: string;
    width?: string | number;
    height?: string | number;
    style?: any;
};

export default function Image({
    src,
    width = '100%',
    height = '100%',
    style,
}: Props) {
    // @ts-ignore
    let source: ImageSourcePropType = src;
    if (typeof src === 'string') {
        let uri = getOSSFileUrl(src, `image/quality,q_80`);
        if (width !== '100%' && height !== '100%') {
            uri = getOSSFileUrl(
                src,
                `image/resize,w_${Math.ceil(width as number)},h_${Math.ceil(
                    height as number,
                )}/quality,q_80`,
            );
        }
        source = {
            uri: uri as string,
            cache: 'force-cache',
            headers: {
                Referer: referer,
            },
        };
    }
    return <BaseImage source={source} style={[style, { width, height }]} />;
}

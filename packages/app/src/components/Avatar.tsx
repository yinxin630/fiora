import React from 'react';
import { getOSSFileUrl } from '../utils/uploadFile';

import Image from './Image';

type Props = {
    src: string;
    size: number;
};
export default function Avatar({ src, size }: Props) {
    const targetUrl = getOSSFileUrl(
        src,
        `image/resize,w_${size * 2},h_${size * 2}/quality,q_90`,
    ) as string;
    return (
        <Image
            src={targetUrl}
            width={size}
            height={size}
            style={{ borderRadius: size / 2 }}
        />
    );
}

import React from 'react';
import QRCode from 'qrcode.react';

import Dialog from '../../components/Dialog';
import Style from './Download.less';
import Common from './Common.less';

interface DownloadProps {
    visible: boolean;
    onClose: () => void;
}

function Download(props: DownloadProps) {
    const { visible, onClose } = props;
    const androidDownloadUrl = `${window.location.origin}/fiora.apk`;
    const iOSDownloadUrl = '';

    return (
        <Dialog
            className={Style.download}
            visible={visible}
            title="Download APP"
            onClose={onClose}
        >
            <div className={Common.container}>
                <div className={Common.block}>
                    <p className={Common.title}>Android</p>
                    <div className={Style.android}>
                        <p>
                        Link:{' '}
                            <a href={androidDownloadUrl}>
                                {androidDownloadUrl}
                            </a>
                        </p>
                        <QRCode value={androidDownloadUrl} size={200} />
                    </div>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>iOS</p>
                    <div className={Style.ios}>
                        <p>
                        Link: <a href={iOSDownloadUrl}>{iOSDownloadUrl}</a>
                        </p>
                        <QRCode value={iOSDownloadUrl} size={200} />
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default Download;

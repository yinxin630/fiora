import React from 'react';

import Dialog from '../../components/Dialog';
import AndroidApkImage from '../../assets/images/android-apk.png';

import Style from './Download.less';
import Common from './Common.less';

interface DownloadProps {
    visible: boolean;
    onClose: () => void;
}

function Download(props: DownloadProps) {
    const { visible, onClose } = props;
    return (
        <Dialog className={Style.download} visible={visible} title="下载APP" onClose={onClose}>
            <div className={Common.container}>
                <div className={Common.block}>
                    <p className={Common.title}>Android</p>
                    <div className={Style.android}>
                        <p>点击链接或者扫码下载APK</p>
                        <a href={`https://cdn.suisuijiang.com/fiora.apk?v=${Date.now()}`} download>
                            https://cdn.suisuijiang.com/fiora.apk
                        </a>
                        <br />
                        <img
                            src={AndroidApkImage}
                            alt="安卓app下载二维码"
                        />
                    </div>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>iOS</p>
                    <div className={Style.ios}>
                        <p>审核中, 敬请期待~~</p>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default Download;

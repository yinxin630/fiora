import React from 'react';

import Dialog from '../../components/Dialog';

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
                        <a href={`https://cdn.suisuijiang.com/fiora.apk?v=${Date.now()}`} download>https://cdn.suisuijiang.com/fiora.apk</a>
                        <br />
                        <img src={require('../../assets/images/android-apk.png')} alt="安卓app下载二维码" />
                    </div>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>iOS</p>
                    <div className={Style.ios}>
                        <p>1. Apple Store 搜索 expo 并下载 Expo Client</p>
                        <p>2. 打开 expo, 并使用碎碎酱的 expo 账号登录(suisuijiang / fiora123456)</p>
                        <p>3. 登录成功后点击 fiora 启动应用</p>
                        <img src={require('../../assets/images/ios-expo.png')} alt="ios expo 操作指引" />
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default Download;

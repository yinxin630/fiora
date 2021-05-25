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
                        <p>
                            链接:{' '}
                            <a href="https://pan.baidu.com/s/1yeGaNzkb2iozeIp0kNWZow">
                                https://pan.baidu.com/s/1yeGaNzkb2iozeIp0kNWZow
                            </a>
                        </p>
                        <p>提取码: pjpq</p>
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog from '@/components/Dialog';

export default class AppDownload extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
    }
    render() {
        const { visible, onClose } = this.props;
        return (
            <Dialog className="dialog app-download" visible={visible} title="下载APP" onClose={onClose}>
                <div className="content">
                    <div>
                        <p>Android</p>
                        <div className="android">
                            <p>点击链接或者扫码下载APK</p>
                            <a href="http://cdn.suisuijiang.com/fiora-v0.4.0.apk" download>http://cdn.suisuijiang.com/fiora-v0.4.0.apk</a>
                            <br />
                            <img src="https://qr.api.cli.im/qr?data=http%253A%252F%252Fcdn.suisuijiang.com%252Ffiora-v0.4.0.apk&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=1d772963649f10d1eff6b28642cc6eb3" />
                        </div>
                    </div>
                    <div>
                        <p>iOS</p>
                        <div className="ios">
                            <p>1. Apple Store 搜索 expo 并下载 Expo Client</p>
                            <p>2. 打开 expo, 并使用碎碎酱的 expo 账号登录(suisuijiang / fiora123456)</p>
                            <p>3. 登录成功后点击 fiora 启动应用</p>
                            <img src="https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e7903f78_1528384800528.png?width=850&height=644" />
                        </div>
                    </div>
                </div>
            </Dialog>
        );
    }
}

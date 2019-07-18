import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';

import Dialog from '@/components/Dialog';

@immutableRenderDecorator
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
                            <a href={`https://cdn.suisuijiang.com/fiora.apk?v=${Date.now()}`} download>https://cdn.suisuijiang.com/fiora.apk</a>
                            <br />
                            <img src="https://cdn.suisuijiang.com/ImageMessage/5adad39555703565e7903f78_1560177623684.png" />
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

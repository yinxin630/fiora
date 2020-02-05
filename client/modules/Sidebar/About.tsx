import React from 'react';

import Dialog from '../../components/Dialog';
import Style from './About.less';
import Common from './Common.less';

interface AboutProps {
    visible: boolean;
    onClose: () => void;
}

function About(props: AboutProps) {
    const { visible, onClose } = props;
    return (
        <Dialog className={Style.about} visible={visible} title="关于" onClose={onClose}>
            <div>
                <div className={Common.block}>
                    <p className={Common.title}>作者主页</p>
                    <a href="https://suisuijiang.com" target="_black" rel="noopener noreferrer">
                        https://suisuijiang.com
                    </a>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>如何运行</p>
                    <a
                        href="https://github.com/yinxin630/fiora/blob/master/doc/INSTALL.ZH.md"
                        target="_black"
                        rel="noopener noreferrer"
                    >
                        https://github.com/yinxin630/fiora/blob/master/doc/INSTALL.ZH.md
                    </a>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>架构 / 设计思路</p>
                    <a
                        href="https://github.com/yinxin630/blog/issues/3"
                        target="_black"
                        rel="noopener noreferrer"
                    >
                        https://github.com/yinxin630/blog/issues/3
                    </a>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>将fiora安装到主屏(PWA)</p>
                    <ul>
                        <li>点击地址栏最右边三个点按钮(或者地址栏末尾收藏前的按钮)</li>
                        <li>选择&quot;安装 fiora&quot;</li>
                    </ul>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>输入框快捷键</p>
                    <ul>
                        <li>Alt + S: 发送滑稽</li>
                        <li>Alt + D: 发送表情</li>
                    </ul>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>命令消息</p>
                    <ul>
                        <li>-roll [number]: 掷点</li>
                        <li>-rps: 石头剪刀布</li>
                    </ul>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>友情链接</p>
                    <ul>
                        <li>
                            <a
                                href="https://wangyaxing.cn/"
                                target="_black"
                                rel="noopener noreferrer"
                            >
                                木子星兮
                            </a>
                        </li>
                        <li>
                            <a
                                href="http://diy.b7.cn"
                                target="_black"
                                rel="noopener noreferrer"
                            >
                                表情生成器
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </Dialog>
    );
}

export default About;

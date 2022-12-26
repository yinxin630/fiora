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
        <Dialog
            className={Style.about}
            visible={visible}
            title="about"
            onClose={onClose}
        >
            <div>
                <div className={Common.block}>
                    <p className={Common.title}>author</p>
                    <a
                        href="https://arafatrahaman.is-a.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Arafat Rahaman
                    </a>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>Based on fiora</p>
                    <a
                        href="https://yinxin630.github.io/fiora/zh-Hans/"
                        target="_black"
                        rel="noopener noreferrer"
                    >
                        https://yinxin630.github.io/fiora/zh-Hans/
                    </a>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>Privacy Policy</p>
                    <a
                        href="/PrivacyPolicy.html"
                        target="_black"
                        rel="noopener noreferrer"
                    >
                        {`${window.location.origin}/PrivacyPolicy.html`}
                    </a>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>install fiora to home screen(PWA)</p>
                    <ul>
                        <li>
                        Click the three dots button on the far right of the address bar(Or the button before the favorite icon at the end of the address bar)
                        </li>
                        <li>choose&quot;install fiora&quot;</li>
                    </ul>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>Input box shortcut key</p>
                    <ul>
                        <li>Alt + S: send funny</li>
                        <li>Alt + D: send emoji</li>
                    </ul>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>command message</p>
                    <ul>
                        <li>-roll [number]: toss</li>
                        <li>-rps: rock-paper-scissors</li>
                    </ul>
                </div>
                <div className={Common.block}>
                    <p className={Common.title}>Links</p>
                    <ul>
                        <li>
                            <a
                                href="https://wangyaxing.cn/"
                                target="_black"
                                rel="noopener noreferrer"
                            >
                                Muzi Xingxi
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </Dialog>
    );
}

export default About;

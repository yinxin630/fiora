import React from 'react';

import AlipayImage from '@fiora/assets/images/alipay.png';
import WxpayImage from '@fiora/assets/images/wxpay.png';
import Dialog from '../../components/Dialog';
import Style from './Reward.less';

interface RewardProps {
    visible: boolean;
    onClose: () => void;
}

function Reward(props: RewardProps) {
    const { visible, onClose } = props;
    return (
        <Dialog
            className={Style.reward}
            visible={visible}
            title="打赏"
            onClose={onClose}
        >
            <div>
                <p className={Style.text}>
                    If you think this chat room code is helpful to you, I hope to reward you for encouragement~~
                    <br />
                    The author is online most of the time, welcome to ask questions, answer all questions
                </p>
                <div className={Style.imageContainer}>
                    <img
                        className={Style.image}
                        src={AlipayImage}
                        alt="Alipay QR code"
                    />
                    <img
                        className={Style.image}
                        src={WxpayImage}
                        alt="Wechat QR code"
                    />
                </div>
            </div>
        </Dialog>
    );
}

export default Reward;

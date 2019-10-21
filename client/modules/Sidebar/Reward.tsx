import React from 'react';

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
                    如果你觉得这个聊天室代码对你有帮助, 希望打赏下给个鼓励~~
                    <br />
                    作者大多数时间在线, 欢迎提问, 有问必答
                </p>
                <div className={Style.imageContainer}>
                    <img className={Style.image} src={require('../../assets/images/alipay.png')} alt="支付宝二维码" />
                    <img className={Style.image} src={require('../../assets/images/wxpay.png')} alt="微信二维码" />
                </div>
            </div>
        </Dialog>
    );
}

export default Reward;

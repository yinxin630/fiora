import React from 'react';
import { useSelector } from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';

import { isMobile } from '../../../utils/ua';
import { State } from '../../state/reducer';
import useIsLogin from '../../hooks/useIsLogin';
import useAction from '../../hooks/useAction';
import IconButton from '../../components/IconButton';
import Message from '../../components/Message';

import Style from './HeaderBar.less';
import useAero from '../../hooks/useAero';


interface HeaderBarProps {
    /** 联系人名称, 没有联系人时会传空 */
    name: string;
    /** 联系人类型, 没有联系人时会传空 */
    type: string;
    /** 功能按钮点击事件 */
    onClickFunction: () => void;
}

function HeaderBar(props: HeaderBarProps) {
    const { name, type, onClickFunction } = props;

    const action = useAction();
    const connectStatus = useSelector((state: State) => state.connect);
    const isLogin = useIsLogin();
    const sidebarVisible = useSelector((state: State) => state.status.sidebarVisible);
    const aero = useAero();

    function handleShareGroup() {
        Message.success('已复制邀请信息到粘贴板, 去邀请其它人加群吧');
    }

    return (
        <div className={Style.headerBar} {...aero}>
            {isMobile && (
                <div className={Style.buttonContainer}>
                    <IconButton
                        width={40}
                        height={40}
                        icon="feature"
                        iconSize={24}
                        onClick={() => action.setStatus('sidebarVisible', !sidebarVisible)}
                    />
                    <IconButton
                        width={40}
                        height={40}
                        icon="friends"
                        iconSize={24}
                        onClick={() => action.setStatus('functionBarAndLinkmanListVisible', true)}
                    />
                </div>
            )}
            <h2 className={Style.name}>
                {name && <span>{name}</span>}
                {isMobile && (
                    <span className={Style.status}>
                        <div className={connectStatus ? 'online' : 'offline'} />
                        {connectStatus ? '在线' : '离线'}
                    </span>
                )}
            </h2>
            {
                isLogin && type
                    ? (
                        <div className={`${Style.buttonContainer} ${Style.rightButtonContainer}`}>
                            {type === 'group' && (
                                <CopyToClipboard text={`invite::${name}`}>
                                    <IconButton
                                        width={40}
                                        height={40}
                                        icon="share"
                                        iconSize={24}
                                        onClick={handleShareGroup}
                                    />
                                </CopyToClipboard>
                            )}
                            <IconButton
                                width={40}
                                height={40}
                                icon="gongneng"
                                iconSize={24}
                                onClick={onClickFunction}
                            />
                        </div>
                    )
                    : <div className={Style.buttonContainer} />
            }
        </div>
    );
}

export default HeaderBar;

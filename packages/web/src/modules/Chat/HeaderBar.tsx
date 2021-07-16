import React from 'react';
import { useSelector } from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';
import { css } from 'linaria';

import { isMobile } from '@fiora/utils/ua';
import { State } from '../../state/reducer';
import useIsLogin from '../../hooks/useIsLogin';
import useAction from '../../hooks/useAction';
import IconButton from '../../components/IconButton';
import Message from '../../components/Message';

import Style from './HeaderBar.less';
import useAero from '../../hooks/useAero';

const styles = {
    count: css`
        font-size: 14px;
        @media (max-width: 500px) {
            font-size: 12px;
        }
    `,
};

type Props = {
    id: string;
    /** 联系人名称, 没有联系人时会传空 */
    name: string;
    /** 联系人类型, 没有联系人时会传空 */
    type: string;
    onlineMembersCount?: number;
    isOnline?: boolean;
    /** 功能按钮点击事件 */
    onClickFunction: () => void;
};

function HeaderBar(props: Props) {
    const { id, name, type, onlineMembersCount, isOnline, onClickFunction } = props;

    const action = useAction();
    const connectStatus = useSelector((state: State) => state.connect);
    const isLogin = useIsLogin();
    const sidebarVisible = useSelector((state: State) => state.status.sidebarVisible);
    const aero = useAero();

    function handleShareGroup() {
        Message.success('已复制邀请链接到粘贴板, 去邀请其它人加入群组吧');
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
                {name && (
                    <span>
                        {name}{' '}
                        {isLogin && onlineMembersCount !== undefined && (
                            <b className={styles.count}>{`(${onlineMembersCount})`}</b>
                        )}
                        {isLogin && isOnline !== undefined && (
                            <b className={styles.count}>{`(${isOnline ? '在线' : '离线'})`}</b>
                        )}
                    </span>
                )}
                {isMobile && (
                    <span className={Style.status}>
                        <div className={connectStatus ? 'online' : 'offline'} />
                        {connectStatus ? '在线' : '离线'}
                    </span>
                )}
            </h2>
            {isLogin && type ? (
                <div className={`${Style.buttonContainer} ${Style.rightButtonContainer}`}>
                    {type === 'group' && (
                        <CopyToClipboard text={`${window.location.origin}/invite/group/${id}`}>
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
            ) : (
                <div className={Style.buttonContainer} />
            )}
        </div>
    );
}

export default HeaderBar;

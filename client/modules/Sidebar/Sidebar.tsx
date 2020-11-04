import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';

import { State } from '../../state/reducer';
import useIsLogin from '../../hooks/useIsLogin';
import Avatar from '../../components/Avatar';
import Tooltip from '../../components/Tooltip';
import IconButton from '../../components/IconButton';
import OnlineStatus from './OnlineStatus';
import { isMobile } from '../../../utils/ua';
import useAction from '../../hooks/useAction';
import socket from '../../socket';
import Message from '../../components/Message';

import Admin from './Admin';
import Download from './Download';
import Reward from './Reward';
import About from './About';

import Style from './Sidebar.less';
import useAero from '../../hooks/useAero';

// @ts-ignore
const SelfInfoAsync = loadable(() => import(/* webpackChunkName: "self-info" */ './SelfInfo'));
// @ts-ignore
const SettingAsync = loadable(() => import(/* webpackChunkName: "setting" */ './Setting'));

function Sidebar() {
    const sidebarVisible = useSelector((state: State) => state.status.sidebarVisible);
    const action = useAction();
    const isLogin = useIsLogin();
    const isConnect = useSelector((state: State) => state.connect);
    const isAdmin = useSelector((state: State) => state.user && state.user.isAdmin);
    const avatar = useSelector((state: State) => state.user && state.user.avatar);

    const [selfInfoDialogVisible, toggleSelfInfoDialogVisible] = useState(false);
    const [adminDialogVisible, toggleAdminDialogVisible] = useState(false);
    const [downloadDialogVisible, toggleDownloadDialogVisible] = useState(false);
    const [rewardDialogVisible, toggleRewardDialogVisible] = useState(false);
    const [aboutDialogVisible, toggleAboutDialogVisible] = useState(false);
    const [settingDialogVisible, toggleSettingDialogVisible] = useState(false);
    const aero = useAero();

    if (!sidebarVisible) {
        return null;
    }

    function logout() {
        action.logout();
        window.localStorage.removeItem('token');
        Message.success('您已经退出登录');
        socket.disconnect();
        socket.connect();
    }

    function renderTooltip(text: string, component: JSX.Element) {
        const children = <div>{component}</div>;
        if (isMobile) {
            return children;
        }
        return (
            <Tooltip placement="right" mouseEnterDelay={0.3} overlay={<span>{text}</span>}>
                {children}
            </Tooltip>
        );
    }

    return (
        <>
            <div className={Style.sidebar} {...aero}>
                {isLogin && avatar && (
                    <Avatar
                        className={Style.avatar}
                        src={avatar}
                        onClick={() => toggleSelfInfoDialogVisible(true)}
                    />
                )}
                {isLogin && (
                    <OnlineStatus
                        className={Style.status}
                        status={isConnect ? 'online' : 'offline'}
                    />
                )}
                <div className={Style.buttons}>
                    {isLogin
                        && isAdmin
                        && renderTooltip(
                            '管理员',
                            <IconButton
                                width={40}
                                height={40}
                                icon="administrator"
                                iconSize={28}
                                onClick={() => toggleAdminDialogVisible(true)}
                            />,
                        )}
                    <Tooltip placement="right" mouseEnterDelay={0.3} overlay={<span>源码</span>}>
                        <a
                            className={Style.linkButton}
                            href="https://github.com/yinxin630/fiora"
                            target="_black"
                            rel="noopener noreferrer"
                        >
                            <IconButton width={40} height={40} icon="github" iconSize={26} />
                        </a>
                    </Tooltip>
                    {renderTooltip(
                        '下载APP',
                        <IconButton
                            width={40}
                            height={40}
                            icon="app"
                            iconSize={28}
                            onClick={() => toggleDownloadDialogVisible(true)}
                        />,
                    )}
                    {renderTooltip(
                        '打赏',
                        <IconButton
                            width={40}
                            height={40}
                            icon="dashang"
                            iconSize={26}
                            onClick={() => toggleRewardDialogVisible(true)}
                        />,
                    )}
                    {renderTooltip(
                        '关于',
                        <IconButton
                            width={40}
                            height={40}
                            icon="about"
                            iconSize={26}
                            onClick={() => toggleAboutDialogVisible(true)}
                        />,
                    )}
                    {isLogin
                        && renderTooltip(
                            '设置',
                            <IconButton
                                width={40}
                                height={40}
                                icon="setting"
                                iconSize={26}
                                onClick={() => toggleSettingDialogVisible(true)}
                            />,
                        )}
                    {isLogin
                        && renderTooltip(
                            '退出登录',
                            <IconButton
                                width={40}
                                height={40}
                                icon="logout"
                                iconSize={26}
                                onClick={logout}
                            />,
                        )}
                </div>

                {/* 弹窗 */}
                {isLogin && selfInfoDialogVisible && (
                    <SelfInfoAsync
                        visible={selfInfoDialogVisible}
                        onClose={() => toggleSelfInfoDialogVisible(false)}
                    />
                )}
                {isLogin && isAdmin && (
                    <Admin
                        visible={adminDialogVisible}
                        onClose={() => toggleAdminDialogVisible(false)}
                    />
                )}
                <Download
                    visible={downloadDialogVisible}
                    onClose={() => toggleDownloadDialogVisible(false)}
                />
                <Reward
                    visible={rewardDialogVisible}
                    onClose={() => toggleRewardDialogVisible(false)}
                />
                <About
                    visible={aboutDialogVisible}
                    onClose={() => toggleAboutDialogVisible(false)}
                />
                {isLogin && settingDialogVisible && (
                    <SettingAsync
                        visible={settingDialogVisible}
                        onClose={() => toggleSettingDialogVisible(false)}
                    />
                )}
            </div>
        </>
    );
}

export default Sidebar;

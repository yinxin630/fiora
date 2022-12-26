import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';

import { isMobile } from '@fiora/utils/ua';
import { State } from '../../state/reducer';
import useIsLogin from '../../hooks/useIsLogin';
import Avatar from '../../components/Avatar';
import Tooltip from '../../components/Tooltip';
import IconButton from '../../components/IconButton';
import OnlineStatus from './OnlineStatus';
import useAction from '../../hooks/useAction';
import socket from '../../socket';
import Message from '../../components/Message';

import Admin from './Admin';
import Download from './Download';
import Reward from './Reward';
import About from './About';

import Style from './Sidebar.less';
import useAero from '../../hooks/useAero';

const SelfInfoAsync = loadable(
    () =>
        // @ts-ignore
        import(/* webpackChunkName: "self-info" */ './SelfInfo'),
);
const SettingAsync = loadable(
    // @ts-ignore
    () => import(/* webpackChunkName: "setting" */ './Setting'),
);

function Sidebar() {
    const sidebarVisible = useSelector(
        (state: State) => state.status.sidebarVisible,
    );
    const action = useAction();
    const isLogin = useIsLogin();
    const isConnect = useSelector((state: State) => state.connect);
    const isAdmin = useSelector(
        (state: State) => state.user && state.user.isAdmin,
    );
    const avatar = useSelector(
        (state: State) => state.user && state.user.avatar,
    );

    const [selfInfoDialogVisible, toggleSelfInfoDialogVisible] =
        useState(false);
    const [adminDialogVisible, toggleAdminDialogVisible] = useState(false);
    const [downloadDialogVisible, toggleDownloadDialogVisible] =
        useState(false);
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
        Message.success('You have logged out');
        socket.disconnect();
        socket.connect();
    }

    function renderTooltip(text: string, component: JSX.Element) {
        const children = <div>{component}</div>;
        if (isMobile) {
            return children;
        }
        return (
            <Tooltip
                placement="right"
                mouseEnterDelay={0.3}
                overlay={<span>{text}</span>}
            >
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
                    {isLogin &&
                        isAdmin &&
                        renderTooltip(
                            'administrator',
                            <IconButton
                                width={40}
                                height={40}
                                icon="administrator"
                                iconSize={28}
                                onClick={() => toggleAdminDialogVisible(true)}
                            />,
                        )}
                    <Tooltip
                        placement="right"
                        mouseEnterDelay={0.3}
                        overlay={<span>Original source</span>}
                    >
                        <a
                            className={Style.linkButton}
                            href="https://github.com/yinxin630/fiora"
                            target="_black"
                            rel="noopener noreferrer"
                        >
                            <IconButton
                                width={40}
                                height={40}
                                icon="github"
                                iconSize={26}
                            />
                        </a>
                    </Tooltip>
                    {renderTooltip(
                        'Download App',
                        <IconButton
                            width={40}
                            height={40}
                            icon="app"
                            iconSize={28}
                            onClick={() => toggleDownloadDialogVisible(true)}
                        />,
                    )}
                    {renderTooltip(
                        'Reward',
                        <IconButton
                            width={40}
                            height={40}
                            icon="dashang"
                            iconSize={26}
                            onClick={() => toggleRewardDialogVisible(true)}
                        />,
                    )}
                    {renderTooltip(
                        'About',
                        <IconButton
                            width={40}
                            height={40}
                            icon="about"
                            iconSize={26}
                            onClick={() => toggleAboutDialogVisible(true)}
                        />,
                    )}
                    {isLogin &&
                        renderTooltip(
                            'Settings',
                            <IconButton
                                width={40}
                                height={40}
                                icon="setting"
                                iconSize={26}
                                onClick={() => toggleSettingDialogVisible(true)}
                            />,
                        )}
                    {isLogin &&
                        renderTooltip(
                            'Logout',
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

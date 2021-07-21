import React, { useEffect, useRef } from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { Actions } from 'react-native-router-flux';

import { isiOS } from '../../utils/platform';

import MessageList from './MessageList';
import Input from './Input';
import PageContainer from '../../components/PageContainer';
import { Friend, Group, Linkman } from '../../types/redux';
import { useFocusLinkman, useIsLogin, useSelfId, useStore } from '../../hooks/useStore';
import {
    getDefaultGroupOnlineMembers,
    getGroupOnlineMembers,
    getUserOnlineStatus,
} from '../../service';
import action from '../../state/action';
import { formatLinkmanName } from '../../utils/linkman';
import fetch from '../../utils/fetch';

let lastMessageIdCache = '';

const keyboardOffset = (() => {
    const { width, height } = Dimensions.get('window');
    const screenRatio = height / width;
    if (screenRatio === 667 / 375) {
        // iPhone 6 / 7 / 8
        return 64;
    }
    if (screenRatio === 736 / 414) {
        // iPhone 6 / 7 / 8 PLUS
        return 64;
    }
    if (screenRatio === 812 / 375) {
        // iPhone X / 12mini
        return 86;
    }
    if (screenRatio === 896 / 414) {
        // iPhone Xr / 11 / 11 Pro Max
        return 86;
    }
    if (screenRatio === 844 / 390) {
        // iPhone 12 / 12 Prop
        return 64;
    }
    if (screenRatio === 926 / 428) {
        // iPhone 12 Pro Max
        return 64;
    }
    return Constants.statusBarHeight + 44;
})();

export default function Chat() {
    const isLogin = useIsLogin();
    const self = useSelfId();
    const { focus } = useStore();
    const linkman = useFocusLinkman();
    const $messageList = useRef<ScrollView>();

    async function fetchGroupOnlineMembers() {
        let onlineMembers: Group['members'] = [];
        if (isLogin) {
            onlineMembers = await getGroupOnlineMembers(focus);
        } else {
            onlineMembers = await getDefaultGroupOnlineMembers();
        }
        if (onlineMembers) {
            action.updateGroupProperty(focus, 'members', onlineMembers);
        }
    }
    async function fetchUserOnlineStatus() {
        const isOnline = await getUserOnlineStatus(focus.replace(self, ''));
        action.updateFriendProperty(focus, 'isOnline', isOnline);
    }
    useEffect(() => {
        if (!linkman || !isLogin) {
            return;
        }
        const request = linkman.type === 'group' ? fetchGroupOnlineMembers : fetchUserOnlineStatus;
        request();
        const timer = setInterval(() => request(), 1000 * 60);
        return () => clearInterval(timer);
    }, [focus, isLogin]);

    useEffect(() => {
        if (Actions.currentScene !== 'chat') {
            return;
        }
        Actions.refresh({
            title: formatLinkmanName(linkman as Linkman),
        });
    }, [(linkman as Group).members, (linkman as Friend).isOnline]);

    async function intervalUpdateHistory() {
        if (isLogin && linkman) {
            if (linkman.messages.length > 0) {
                const lastMessageId = linkman.messages[linkman.messages.length - 1]._id;
                if (lastMessageId !== lastMessageIdCache) {
                    lastMessageIdCache = lastMessageId;
                    await fetch('updateHistory', { linkmanId: focus, messageId: lastMessageId });
                }
            }
        }
    }
    useEffect(() => {
        const timer = setInterval(intervalUpdateHistory, 1000 * 5);
        return () => clearInterval(timer);
    }, [focus]);

    function scrollToEnd(time = 0) {
        if (time > 200) {
            return;
        }
        if ($messageList.current) {
            $messageList.current!.scrollToEnd({ animated: false });
        }

        setTimeout(() => {
            scrollToEnd(time + 50);
        }, 50);
    }

    function handleInputHeightChange() {
        if ($messageList.current) {
            scrollToEnd();
        }
    }

    return (
        <PageContainer disableSafeAreaView>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={isiOS ? 'padding' : 'height'}
                keyboardVerticalOffset={keyboardOffset}
            >
                {/* 
                // @ts-ignore */}
                <MessageList $scrollView={$messageList} />
                <Input onHeightChange={handleInputHeightChange} />
            </KeyboardAvoidingView>
        </PageContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

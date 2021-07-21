import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { useState, useEffect } from 'react';
import { Platform, AppState } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { setNotificationToken } from '../service';
import action from '../state/action';
import { State, User } from '../types/redux';
import { isiOS } from '../utils/platform';
import { useIsLogin, useStore } from '../hooks/useStore';
import store from '../state/store';

function enableNotification() {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }),
    });
}
function disableNotification() {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: false,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });
}

function Nofitication() {
    const isLogin = useIsLogin();
    const state = useStore();
    const notificationTokens = (state.user as User)?.notificationTokens || [];
    const { connect } = state;

    const [notificationToken, updateNotificationToken] = useState('');

    async function registerForPushNotificationsAsync() {
        // Push notification to Android device need google service
        // Not supported in China
        if (Constants.isDevice && isiOS) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                return;
            }
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            updateNotificationToken(token);

            if (Platform.OS === 'android') {
                Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                });
            }
        }
    }
    function handleClickNotification(response: any) {
        const { focus } = response.notification.request.content.data;
        setTimeout(() => {
            const currentState = store.getState() as State;
            const linkmans = currentState.linkmans || [];
            if (linkmans.find((linkman) => linkman._id === focus)) {
                action.setFocus(focus);
                if (Actions.currentScene !== 'chat') {
                    Actions.chat();
                }
            }
        }, 1000);
    }
    useEffect(() => {
        disableNotification();
        registerForPushNotificationsAsync();

        Notifications.addNotificationResponseReceivedListener(handleClickNotification);
    }, []);

    useEffect(() => {
        if (
            connect &&
            isLogin &&
            notificationToken &&
            !notificationTokens.includes(notificationToken)
        ) {
            setNotificationToken(notificationToken);
        }
    }, [connect, isLogin, notificationToken]);

    function handleAppStateChange(nextAppState: string) {
        if (nextAppState === 'active') {
            disableNotification();
        } else if (nextAppState === 'background') {
            enableNotification();
        }
    }
    useEffect(() => {
        AppState.addEventListener('change', handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        };
    }, []);

    return null;
}

export default Nofitication;

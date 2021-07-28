import { Text, View } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import Avatar from '../../components/Avatar';
import { useIsLogin, useStore, useTheme, useUser } from '../../hooks/useStore';

function SelfInfo() {
    const isLogin = useIsLogin();
    const user = useUser();
    const { primaryTextColor10 } = useTheme();
    const { connect } = useStore();

    if (!isLogin) {
        return null;
    }

    const { avatar, username } = user;

    return (
        <View style={[styles.container]}>
            <View>
                <Avatar src={avatar} size={32} />
                <View
                    style={[
                        styles.onlineStatus,
                        connect ? styles.online : styles.offline,
                    ]}
                />
            </View>
            <View>
                <Text style={[styles.nickname, { color: primaryTextColor10 }]}>
                    {username}
                </Text>
            </View>
        </View>
    );
}

export default SelfInfo;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 38,
        paddingLeft: 8,
        paddingRight: 8,
    },
    avatar: {
        position: 'relative',
    },
    nickname: {
        marginLeft: 8,
    },
    onlineStatus: {
        width: 10,
        height: 10,
        borderRadius: 5,
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    online: {
        backgroundColor: 'rgba(94, 212, 92, 1)',
    },
    offline: {
        backgroundColor: 'rgba(206, 12, 35, 1)',
    },
});

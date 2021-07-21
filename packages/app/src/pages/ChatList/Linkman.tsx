import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Time from '../../utils/time';
import action from '../../state/action';

import Avatar from '../../components/Avatar';
import { Linkman as LinkmanType } from '../../types/redux';
import { formatLinkmanName } from '../../utils/linkman';
import fetch from '../../utils/fetch';

type Props = {
    id: string;
    name: string;
    avatar: string;
    preview: string;
    time: Date;
    unread: number;
    lastMessageId: string;
    linkman: LinkmanType;
};

export default function Linkman({
    id,
    name,
    avatar,
    preview,
    time,
    unread,
    lastMessageId,
    linkman,
}: Props) {
    function formatTime() {
        const nowTime = new Date();
        if (Time.isToday(nowTime, time)) {
            return Time.getHourMinute(time);
        }
        if (Time.isYesterday(nowTime, time)) {
            return '昨天';
        }
        if (Time.isSameYear(nowTime, time)) {
            return Time.getMonthDate(time);
        }
        return Time.getYearMonthDate(time);
    }

    function handlePress() {
        action.setFocus(id);
        Actions.chat({ title: formatLinkmanName(linkman) });

        if (id && lastMessageId) {
            fetch('updateHistory', { linkmanId: id, messageId: lastMessageId });
        }
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.container}>
                <Avatar src={avatar} size={50} />
                <View style={styles.content}>
                    <View style={styles.nickTime}>
                        <Text style={styles.nick}>{name}</Text>
                        <Text style={styles.time}>{formatTime()}</Text>
                    </View>
                    <View style={styles.previewUnread}>
                        <Text style={styles.preview} numberOfLines={1}>
                            {preview}
                        </Text>
                        {unread > 0 ? (
                            <View style={styles.unread}>
                                <Text style={styles.unreadText}>{unread > 99 ? '99' : unread}</Text>
                            </View>
                        ) : null}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 70,
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
    },
    content: {
        flex: 1,
        marginLeft: 8,
    },
    nickTime: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nick: {
        fontSize: 16,
        color: '#333',
    },
    time: {
        fontSize: 14,
        color: '#888',
    },
    previewUnread: {
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    preview: {
        flex: 1,
        fontSize: 14,
        color: '#666',
    },
    unread: {
        backgroundColor: '#2a7bf6',
        width: 18,
        height: 18,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
    },
    unreadText: {
        fontSize: 10,
        color: 'white',
    },
});

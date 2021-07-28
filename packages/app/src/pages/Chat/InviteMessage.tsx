import { View, Text } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Toast from '../../components/Toast';
import { getLinkmanHistoryMessages, joinGroup } from '../../service';
import action from '../../state/action';
import { Message } from '../../types/redux';

type Props = {
    message: Message;
    isSelf: boolean;
};

function InviteMessage({ message, isSelf }: Props) {
    const invite = JSON.parse(message.content);

    async function handleJoinGroup() {
        const group = await joinGroup(invite.group);
        if (group) {
            group.type = 'group';
            action.addLinkman(group, true);
            Actions.refresh({ title: group.name });
            Toast.success('加入群组成功');
            const messages = await getLinkmanHistoryMessages(invite.group, 0);
            if (messages) {
                action.addLinkmanHistoryMessages(invite.group, messages);
            }
        }
    }

    return (
        <TouchableNativeFeedback onPress={handleJoinGroup}>
            <View style={styles.container}>
                <View
                    style={[
                        styles.info,
                        { borderBottomColor: isSelf ? 'white' : '#aaa' },
                    ]}
                >
                    <Text style={styles.text}>
                        &quot;
                        {invite.inviterName}
                        &quot; 邀请你加入群组「
                        {invite.groupName}」
                    </Text>
                </View>
                <View style={styles.join}>
                    <Text style={styles.text}>加入</Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    );
}

export default InviteMessage;

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 16,
    },
    info: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        paddingBottom: 4,
    },
    join: {
        width: '100%',
        paddingTop: 4,
        paddingBottom: 2,
    },
});

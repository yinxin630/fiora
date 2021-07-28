import React from 'react';
import { Button, Text, View } from 'native-base';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PageContainer from '../../components/PageContainer';
import Avatar from '../../components/Avatar';
import { useFocusLinkman, useLinkmans } from '../../hooks/useStore';
import { Linkman } from '../../types/redux';
import action from '../../state/action';
import { getLinkmanHistoryMessages, joinGroup } from '../../service';

type Props = {
    group: {
        _id: string;
        avatar: string;
        name: string;
        members: number;
    };
};

function GroupInfo({ group }: Props) {
    const { _id, avatar, name, members } = group;
    const linkmans = useLinkmans();
    const linkman = linkmans.find(
        (x) => x._id === _id && x.type === 'group',
    ) as Linkman;
    const isJoined = !!linkman;
    const currentLinkman = useFocusLinkman() as Linkman;

    function handleSendMessage() {
        action.setFocus(group._id);
        if (currentLinkman._id === group._id) {
            Actions.popTo('chat');
        } else {
            Actions.popTo('_chatlist');
            Actions.push('chat', { title: group.name });
        }
    }

    async function handleJoinGroup() {
        const newLinkman = await joinGroup(_id);
        if (newLinkman) {
            action.addLinkman({
                ...newLinkman,
                type: 'group',
                unread: 0,
                messages: [],
            });
            const messages = await getLinkmanHistoryMessages(_id, 0);
            action.addLinkmanHistoryMessages(_id, messages);
            action.setFocus(_id);

            Actions.popTo('_chatlist');
            Actions.push('chat', { title: newLinkman.name });
        }
    }

    return (
        <PageContainer>
            <View style={styles.container}>
                <View style={styles.userContainer}>
                    <Avatar src={avatar} size={88} />
                    <Text style={styles.nick}>{name}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>人数:</Text>
                        <Text style={styles.infoValue}>{members}</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    {isJoined ? (
                        <Button
                            primary
                            block
                            style={styles.button}
                            onPress={handleSendMessage}
                        >
                            <Text>发送消息</Text>
                        </Button>
                    ) : (
                        <Button
                            primary
                            block
                            style={styles.button}
                            onPress={handleJoinGroup}
                        >
                            <Text>加入群组</Text>
                        </Button>
                    )}
                </View>
            </View>
        </PageContainer>
    );
}

export default GroupInfo;

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingLeft: 16,
        paddingRight: 16,
    },
    userContainer: {
        alignItems: 'center',
    },
    infoContainer: {
        marginTop: 20,
    },
    infoRow: {
        flexDirection: 'row',
    },
    infoLabel: {
        color: '#666',
    },
    infoValue: {
        color: '#333',
        marginLeft: 12,
    },
    nick: {
        color: '#333',
        marginTop: 6,
    },
    buttonContainer: {
        marginTop: 20,
    },
    button: {
        marginBottom: 12,
    },
});

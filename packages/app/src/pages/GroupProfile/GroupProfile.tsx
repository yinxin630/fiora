import { View, Text, Button } from 'native-base';
import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Avatar from '../../components/Avatar';
import PageContainer from '../../components/PageContainer';
import { useFocusLinkman, useSelfId } from '../../hooks/useStore';
import { deleteGroup, leaveGroup } from '../../service';
import action from '../../state/action';
import { Group } from '../../types/redux';

function GroupProfile() {
    const linkman = useFocusLinkman() as Group;
    const self = useSelfId();
    const isGroupCreator = linkman.creator === self;

    function getOS(os: string) {
        return os === 'Windows Server 2008 R2 / 7' ? 'Windows 7' : os;
    }

    function ShowEnvironment(environment: string) {
        Alert.alert('设备信息', environment);
    }

    async function handleLeaveGroup() {
        if (isGroupCreator) {
            const isSuccess = await deleteGroup(linkman._id);
            if (isSuccess) {
                action.removeLinkman(linkman._id);
                Actions.popTo('_chatlist', { title: '' });
            }
        } else {
            const isSuccess = await leaveGroup(linkman._id);
            if (isSuccess) {
                action.removeLinkman(linkman._id);
                Actions.popTo('_chatlist', { title: '' });
            }
        }
    }

    return (
        <PageContainer>
            <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>功能</Text>
                    <Button danger onPress={handleLeaveGroup}>
                        <Text>{isGroupCreator ? '解散群组' : '退出群组'}</Text>
                    </Button>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>在线成员</Text>
                    {linkman.members.map((member) => (
                        <View key={member._id} style={styles.member}>
                            <Avatar src={member.user.avatar} size={24} />
                            <Text style={styles.memberName}>{member.user.username}</Text>
                            <Pressable
                                style={styles.memberInfoContainer}
                                onPress={() => ShowEnvironment(member.environment)}
                            >
                                <Text style={styles.memberInfo}>
                                    {member.browser} 
                                    {' '}
                                    {getOS(member.os)}
                                </Text>
                            </Pressable>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </PageContainer>
    );
}

export default GroupProfile;

const styles = StyleSheet.create({
    container: {
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 8,
        paddingBottom: 8,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    member: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 32,
    },
    memberName: {
        fontSize: 14,
        color: '#333',
        marginLeft: 8,
    },
    memberInfoContainer: {
        flex: 1,
    },
    memberInfo: {
        fontSize: 12,
        color: '#666',
        textAlign: 'right',
    },
});

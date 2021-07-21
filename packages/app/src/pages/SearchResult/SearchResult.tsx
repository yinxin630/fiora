import React from 'react';
import { Tab, Tabs, Text, View } from 'native-base';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PageContainer from '../../components/PageContainer';
import Avatar from '../../components/Avatar';

type Props = {
    groups: {
        _id: string;
        name: string;
        avatar: string;
        members: number;
    }[];
    users: {
        _id: string;
        username: string;
        avatar: string;
    }[];
};

function SearchResult({ groups, users }: Props) {
    function handleClickGroup(group: any) {
        Actions.push('groupInfo', { group });
    }

    function handleClickUser(user: any) {
        Actions.push('userInfo', { user });
    }

    return (
        <PageContainer disableSafeAreaView>
            <Tabs style={styles.container} tabContainerStyle={{ backgroundColor: 'transparent' }}>
                <Tab
                    heading={`群组(${groups.length})`}
                    tabStyle={{ backgroundColor: 'transparent' }}
                    activeTabStyle={{ backgroundColor: 'transparent' }}
                >
                    <PageContainer>
                        <ScrollView>
                            {groups.map((group) => (
                                <TouchableOpacity key={group._id} onPress={() => handleClickGroup(group)}>
                                    <View style={styles.item}>
                                        <Avatar src={group.avatar} size={40} />
                                        <View style={styles.groupInfo}>
                                            <Text style={styles.groupName}>{group.name}</Text>
                                            <Text style={styles.groupMembers}>
                                                {group.members}
                                                人
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </PageContainer>
                </Tab>
                <Tab
                    heading={`用户(${users.length})`}
                    tabStyle={{ backgroundColor: 'transparent' }}
                    activeTabStyle={{ backgroundColor: 'transparent' }}
                >
                    <PageContainer>
                        <ScrollView>
                            {users.map((user) => (
                                <TouchableOpacity key={user._id} onPress={() => handleClickUser(user)}>
                                    <View style={styles.item}>
                                        <Avatar src={user.avatar} size={40} />
                                        <Text style={styles.username}>{user.username}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </PageContainer>
                </Tab>
            </Tabs>
        </PageContainer>
    );
}

export default SearchResult;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
    },
    item: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
    },
    groupInfo: {
        marginLeft: 8,
    },
    groupName: {
        color: '#444',
    },
    groupMembers: {
        fontSize: 14,
        color: '#888',
        marginTop: 1,
    },
    username: {
        color: '#444',
        marginLeft: 8,
    },
});

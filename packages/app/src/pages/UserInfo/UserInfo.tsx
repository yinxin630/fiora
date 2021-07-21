import React from 'react';
import { Button, Text, View } from 'native-base';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PageContainer from '../../components/PageContainer';
import Avatar from '../../components/Avatar';
import { useFocusLinkman, useIsAdmin, useLinkmans, useSelfId } from '../../hooks/useStore';
import { Linkman } from '../../types/redux';
import action from '../../state/action';
import {
    addFriend,
    deleteFriend,
    getLinkmanHistoryMessages,
    sealUser,
    sealUserOnlineIp,
} from '../../service';
import getFriendId from '../../utils/getFriendId';
import Toast from '../../components/Toast';

type Props = {
    user: {
        _id: string;
        avatar: string;
        tag: string;
        username: string;
    };
};

function UserInfo({ user }: Props) {
    const { _id, avatar, username } = user;
    const linkmans = useLinkmans();
    const friend = linkmans.find((linkman) => linkman._id.includes(_id)) as Linkman;
    const isFriend = friend && friend.type === 'friend';
    const isAdmin = useIsAdmin();
    const currentLinkman = useFocusLinkman() as Linkman;
    const self = useSelfId();

    function handleSendMessage() {
        action.setFocus(friend._id);
        if (currentLinkman._id === friend._id) {
            Actions.pop();
        } else {
            Actions.popTo('_chatlist');
            Actions.push('chat', { title: friend.name });
        }
    }

    async function handleDeleteFriend() {
        const isSuccess = await deleteFriend(_id);
        if (isSuccess) {
            action.removeLinkman(friend._id);
            if (currentLinkman._id === friend._id) {
                Actions.popTo('_chatlist');
            } else {
                Actions.pop();
            }
        }
    }

    async function handleAddFriend() {
        const newLinkman = await addFriend(_id);
        const friendId = getFriendId(_id, self);
        if (newLinkman) {
            if (friend) {
                action.updateFriendProperty(friend._id, 'type', 'friend');
                const messages = await getLinkmanHistoryMessages(
                    friend._id,
                    friend.messages.length,
                );
                action.addLinkmanHistoryMessages(friend._id, messages);
            } else {
                action.addLinkman({
                    ...newLinkman,
                    _id: friendId,
                    name: username,
                    type: 'friend',
                    unread: 0,
                    messages: [],
                    from: self,
                    to: {
                        _id,
                        avatar,
                        username,
                    },
                });
                const messages = await getLinkmanHistoryMessages(friendId, 0);
                action.addLinkmanHistoryMessages(friendId, messages);
            }
            action.setFocus(friendId);

            if (currentLinkman._id === friend?._id) {
                Actions.pop();
            } else {
                Actions.popTo('_chatlist');
                Actions.push('chat', { title: newLinkman.username });
            }
        }
    }

    async function handleSealUser() {
        const isSuccess = await sealUser(username);
        if (isSuccess) {
            Toast.success('封禁用户成功');
        }
    }

    async function handleSealIp() {
        const isSuccess = await sealUserOnlineIp(_id);
        if (isSuccess) {
            Toast.success('封禁用户当前ip成功');
        }
    }

    return (
        <PageContainer>
            <View style={styles.container}>
                <View style={styles.userContainer}>
                    <Avatar src={avatar} size={88} />
                    <Text style={styles.nick}>{username}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    {isFriend ? (
                        <>
                            <Button primary block style={styles.button} onPress={handleSendMessage}>
                                <Text>发送消息</Text>
                            </Button>
                            <Button
                                primary
                                block
                                danger
                                style={styles.button}
                                onPress={handleDeleteFriend}
                            >
                                <Text>删除好友</Text>
                            </Button>
                        </>
                    ) : (
                        <Button primary block style={styles.button} onPress={handleAddFriend}>
                            <Text>加为好友</Text>
                        </Button>
                    )}
                    {isAdmin && (
                        <>
                            <Button
                                primary
                                block
                                danger
                                style={styles.button}
                                onPress={handleSealUser}
                            >
                                <Text>封禁用户</Text>
                            </Button>
                            <Button
                                primary
                                block
                                danger
                                style={styles.button}
                                onPress={handleSealIp}
                            >
                                <Text>封禁 ip</Text>
                            </Button>
                        </>
                    )}
                </View>
            </View>
        </PageContainer>
    );
}

export default UserInfo;

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingLeft: 16,
        paddingRight: 16,
    },
    userContainer: {
        alignItems: 'center',
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

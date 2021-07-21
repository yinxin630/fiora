import { View, Icon } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Dialog from 'react-native-dialog';
import { createGroup } from '../../service';
import action from '../../state/action';

function ChatListRightButton() {
    const [showDialog, toggleDialog] = useState(false);
    const [groupName, updateGroupName] = useState('');

    function handleCloseDialog() {
        updateGroupName('');
        toggleDialog(false);
    }

    async function handleCreateGroup() {
        const group = await createGroup(groupName);
        if (group) {
            action.addLinkman({
                ...group,
                type: 'group',
                unread: 1,
                messages: [],
            });
            action.setFocus(group._id);
            handleCloseDialog();
            Actions.push('chat', { title: group.name });
        }
    }

    return (
        <>
            <TouchableOpacity onPress={() => toggleDialog(true)}>
                <View style={styles.container}>
                    <Icon name="add-outline" style={styles.icon} />
                </View>
            </TouchableOpacity>
            <Dialog.Container visible={showDialog}>
                <Dialog.Title>创建群组</Dialog.Title>
                <Dialog.Description>请输入群组名</Dialog.Description>
                <Dialog.Input
                    value={groupName}
                    onChangeText={updateGroupName}
                    autoCapitalize="none"
                    autoFocus
                    autoCorrect={false}
                />
                <Dialog.Button label="取消" onPress={handleCloseDialog} />
                <Dialog.Button label="创建" onPress={handleCreateGroup} />
            </Dialog.Container>
        </>
    );
}

export default ChatListRightButton;

const styles = StyleSheet.create({
    container: {
        width: 44,
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        color: 'white',
        fontSize: 32,
    },
});

import { View, Icon } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { useFocusLinkman } from '../../hooks/useStore';

function ChatRightButton() {
    const linkman = useFocusLinkman();

    function handleClick() {
        if (linkman?.type === 'group') {
            Actions.push('groupProfile');
        } else {
            Actions.push('userInfo', { user: linkman });
        }
    }

    return (
        <TouchableOpacity onPress={handleClick}>
            <View style={styles.container}>
                <Icon name="ellipsis-horizontal" style={styles.icon} />
            </View>
        </TouchableOpacity>
    );
}

export default ChatRightButton;

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
        fontSize: 26,
    },
});

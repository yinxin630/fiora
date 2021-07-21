import { View, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Message } from '../../types/redux';
import { getPerRandomColor } from '../../utils/getRandomColor';

type Props = {
    message: Message;
};

function SystemMessage({ message }: Props) {
    const { content, from } = message;
    return (
        <View style={styles.container}>
            <Text
                style={[styles.text, { color: getPerRandomColor(from.originUsername as string) }]}
            >
                {from.originUsername}
                &nbsp;
            </Text>
            <Text style={styles.text}>{content}</Text>
        </View>
    );
}

export default SystemMessage;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
    },
});

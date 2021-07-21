import { View, Icon, Text } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

type Props = {
    text?: string;
};

function BackButton({ text = '' }: Props) {
    return (
        <TouchableOpacity onPress={() => Actions.pop()}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="chevron-back-outline" style={{ color: 'white', fontSize: 28 }} />
                <Text
                    style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                    }}
                >
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export default BackButton;

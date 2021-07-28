import React, { useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput } from 'react-native';
import { Form, Label, Button, View } from 'native-base';
import { Actions } from 'react-native-router-flux';

import PageContainer from '../../components/PageContainer';

type Props = {
    buttonText: string;
    jumpText: string;
    jumpPage: string;
    onSubmit: (username: string, password: string) => void;
};

export default function Base({
    buttonText,
    jumpText,
    jumpPage,
    onSubmit,
}: Props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const $username = useRef<TextInput>();
    const $password = useRef<TextInput>();

    function handlePress() {
        $username.current!.blur();
        $password.current!.blur();
        onSubmit(username, password);
    }

    function handleJump() {
        if (Actions[jumpPage]) {
            Actions.replace(jumpPage);
        } else {
            Alert.alert(`跳转 ${jumpPage} 失败`);
        }
    }
    return (
        <PageContainer>
            <View style={styles.container}>
                <Form>
                    <Label style={styles.label}>用户名</Label>
                    <TextInput
                        style={[styles.input]}
                        // @ts-ignore
                        ref={$username}
                        clearButtonMode="while-editing"
                        onChangeText={setUsername}
                        autoCapitalize="none"
                        autoCompleteType="username"
                    />
                    <Label style={styles.label}>密码</Label>
                    <TextInput
                        style={[styles.input]}
                        // @ts-ignore
                        ref={$password}
                        secureTextEntry
                        clearButtonMode="while-editing"
                        onChangeText={setPassword}
                        autoCapitalize="none"
                        autoCompleteType="password"
                    />
                </Form>
                <Button
                    primary
                    block
                    style={styles.button}
                    onPress={handlePress}
                >
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </Button>
                <Button transparent style={styles.signup} onPress={handleJump}>
                    <Text style={styles.signupText}>{jumpText}</Text>
                </Button>
            </View>
        </PageContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 20,
    },
    button: {
        marginTop: 18,
    },
    buttonText: {
        fontSize: 18,
        color: '#fafafa',
    },
    signup: {
        alignSelf: 'flex-end',
    },
    signupText: {
        color: '#2a7bf6',
        fontSize: 14,
    },
    label: {
        marginBottom: 8,
    },
    input: {
        height: 42,
        fontSize: 16,
        borderRadius: 6,
        marginBottom: 12,
        paddingLeft: 6,
        borderWidth: 1,
        borderColor: '#777',
    },
});

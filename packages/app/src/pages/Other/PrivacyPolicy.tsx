import { Text } from 'native-base';
import React from 'react';
import { Linking, StyleSheet, TouchableOpacity } from 'react-native';
import Dialog from 'react-native-dialog';
import { removeStorageValue, setStorageValue } from '../../utils/storage';

export const PrivacyPolicyStorageKey = 'privacy-policy';

type Props = {
    visible: boolean;
    onClose: () => void;
};

function PrivacyPolicy({ visible, onClose }: Props) {
    function handleClickPrivacyPolicy() {
        Linking.openURL('https://fiora.suisuijiang.com/PrivacyPolicy.html');
    }

    async function handleAgree() {
        await setStorageValue(PrivacyPolicyStorageKey, 'true');
        onClose();
    }

    async function handleDisagree() {
        await removeStorageValue(PrivacyPolicyStorageKey);
        onClose();
    }

    return (
        <Dialog.Container visible={visible}>
            <Dialog.Title>服务协议和隐私条款</Dialog.Title>
            <Dialog.Description style={styles.container}>
                欢迎使用 fiora
                APP。我们非常重视您的个人信息和隐私保护，在您使用之前，请务必审慎阅读
                <TouchableOpacity onPress={handleClickPrivacyPolicy}>
                    <Text style={styles.text}>《隐私政策》</Text>
                </TouchableOpacity>
                ，并充分理解协议条款内容。我们将严格按照您同意的各项条款使用您的个人信息，以便为您提供更好的服务。
            </Dialog.Description>
            <Dialog.Button label="不同意" onPress={handleDisagree} />
            <Dialog.Button label="同意" onPress={handleAgree} />
        </Dialog.Container>
    );
}

export default PrivacyPolicy;

const styles = StyleSheet.create({
    container: {
        textAlign: 'left',
    },
    text: {
        fontSize: 12,
        color: '#2a7bf6',
    },
});

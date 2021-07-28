import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import action from '../../state/action';
import fetch from '../../utils/fetch';
import { isiOS } from '../../utils/platform';
import expressions from '../../utils/expressions';

import Expression from '../../components/Expression';
import { useIsLogin, useStore, useUser } from '../../hooks/useStore';
import { Message } from '../../types/redux';
import uploadFile from '../../utils/uploadFile';

const { width: ScreenWidth } = Dimensions.get('window');
const ExpressionSize = (ScreenWidth - 16) / 10;

type Props = {
    onHeightChange: () => void;
};

export default function Input({ onHeightChange }: Props) {
    const isLogin = useIsLogin();
    const user = useUser();
    const { focus } = useStore();

    const [message, setMessage] = useState('');
    const [showFunctionList, toggleShowFunctionList] = useState(true);
    const [showExpression, toggleShowExpression] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ start: 0, end: 0 });

    const $input = useRef<TextInput>();

    function setInputText(text = '') {
        // iossetNativeProps无效, 解决办法参考:https://github.com/facebook/react-native/issues/18272
        if (isiOS) {
            $input.current!.setNativeProps({ text: text || ' ' });
        }
        setTimeout(() => {
            $input.current!.setNativeProps({ text: text || '' });
        });
    }

    function addSelfMessage(type: string, content: string) {
        const _id = focus + Date.now();
        const newMessage: Message = {
            _id,
            type,
            content,
            createTime: Date.now(),
            from: {
                _id: user._id,
                username: user.username,
                avatar: user.avatar,
                tag: user.tag,
            },
            to: '',
            loading: true,
        };

        if (type === 'image') {
            newMessage.percent = 0;
        }
        action.addLinkmanMessage(focus, newMessage);

        return _id;
    }

    async function sendMessage(localId: string, type: string, content: string) {
        const [err, res] = await fetch('sendMessage', {
            to: focus,
            type,
            content,
        });
        if (!err) {
            res.loading = false;
            action.updateSelfMessage(focus, localId, res);
        }
    }

    function handleSubmit() {
        if (message === '') {
            return;
        }

        const id = addSelfMessage('text', message);
        sendMessage(id, 'text', message);

        setMessage('');
        toggleShowFunctionList(true);
        toggleShowExpression(false);
        setInputText();
    }

    function handleSelectionChange(event: any) {
        const { start, end } = event.nativeEvent.selection;
        setCursorPosition({
            start,
            end,
        });
    }

    function handleFocus() {
        toggleShowFunctionList(true);
        toggleShowExpression(false);
    }

    function openExpression() {
        $input.current!.blur();

        toggleShowFunctionList(false);
        toggleShowExpression(true);

        onHeightChange();
    }

    async function handleClickImage() {
        const currentPermission = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (currentPermission.accessPrivileges === 'none') {
            if (currentPermission.canAskAgain) {
                const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (permission.accessPrivileges === 'none') {
                    return;
                }
            } else {
                return;
            }
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
        });

        if (!result.cancelled) {
            const id = addSelfMessage(
                'image',
                `${result.uri}?width=${result.width}&height=${result.height}`,
            );
            const key = `ImageMessage/${user._id}_${Date.now()}`;
            const imageUrl = await uploadFile(
                result.base64 as string,
                key,
                true,
            );
            sendMessage(
                id,
                'image',
                `${imageUrl}?width=${result.width}&height=${result.height}`,
            );
        }
    }

    async function handleClickCamera() {
        const currentPermission = await ImagePicker.getCameraPermissionsAsync();
        if (currentPermission.status === 'undetermined') {
            if (currentPermission.canAskAgain) {
                const permission = await ImagePicker.requestCameraPermissionsAsync();
                if (permission.status === 'undetermined') {
                    return;
                }
            } else {
                return;
            }
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
        });

        if (!result.cancelled) {
            const id = addSelfMessage(
                'image',
                `${result.uri}?width=${result.width}&height=${result.height}`,
            );
            const key = `ImageMessage/${user._id}_${Date.now()}`;
            const imageUrl = await uploadFile(
                result.base64 as string,
                key,
                true,
            );
            sendMessage(
                id,
                'image',
                `${imageUrl}?width=${result.width}&height=${result.height}`,
            );
        }
    }

    function handleChangeText(value: string) {
        setMessage(value);
    }

    function insertExpression(e: string) {
        const expression = `#(${e})`;
        const newValue = `${message.substring(
            0,
            cursorPosition.start,
        )}${expression}${message.substring(
            cursorPosition.end,
            message.length,
        )}`;
        setMessage(newValue);
        setCursorPosition({
            start: cursorPosition.start + expression.length,
            end: cursorPosition.start + expression.length,
        });
        setInputText(newValue);
    }

    return (
        <SafeAreaView style={styles.safeView}>
            <View style={styles.container}>
                {isLogin ? (
                    <View style={styles.inputContainer}>
                        <TextInput
                            // @ts-ignore
                            ref={$input}
                            style={styles.input}
                            placeholder="随便聊点啥吧, 不要无意义刷屏~~"
                            onChangeText={handleChangeText}
                            onSubmitEditing={handleSubmit}
                            autoCapitalize="none"
                            blurOnSubmit={false}
                            maxLength={2048}
                            returnKeyType="send"
                            enablesReturnKeyAutomatically
                            underlineColorAndroid="transparent"
                            onSelectionChange={handleSelectionChange}
                            onFocus={handleFocus}
                        />
                    </View>
                ) : (
                    <Button block style={styles.button} onPress={Actions.login}>
                        <Text style={styles.buttonText}>
                            登录 / 注册, 参与聊天
                        </Text>
                    </Button>
                )}
                {isLogin && showFunctionList ? (
                    <View style={styles.iconButtonContainer}>
                        <Button
                            transparent
                            style={styles.iconButton}
                            onPress={openExpression}
                        >
                            <Ionicons name="ios-happy" size={28} color="#999" />
                        </Button>
                        <Button
                            transparent
                            style={styles.iconButton}
                            onPress={handleClickImage}
                        >
                            <Ionicons name="ios-image" size={28} color="#999" />
                        </Button>
                        <Button
                            transparent
                            style={styles.iconButton}
                            onPress={handleClickCamera}
                        >
                            <Ionicons
                                name="ios-camera"
                                size={28}
                                color="#999"
                            />
                        </Button>
                    </View>
                ) : null}
                {showExpression ? (
                    <View style={styles.expressionContainer}>
                        {expressions.default.map((e, i) => (
                            <TouchableOpacity
                                key={e}
                                onPress={() => insertExpression(e)}
                            >
                                <View style={styles.expression}>
                                    <Expression index={i} size={30} />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : null}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeView: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    container: {
        paddingTop: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
    },
    input: {
        flex: 1,
        height: 36,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e5e5e5',
        borderRadius: 5,
    },
    sendButton: {
        width: 50,
        height: 36,
        marginLeft: 8,
        paddingLeft: 10,
    },
    button: {
        height: 36,
        marginTop: 4,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 8,
    },
    buttonText: {
        color: 'white',
    },
    iconContainer: {
        height: 40,
    },
    icon: {
        transform: [
            {
                // @ts-ignore
                translate: [0, -3],
            },
        ],
    },

    iconButtonContainer: {
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        height: 44,
    },
    iconButton: {
        width: '15%',
    },

    cancelButton: {
        borderTopWidth: 1,
        borderTopColor: '#e6e6e6',
    },
    cancelButtonText: {
        color: '#666',
    },

    // 表情框
    expressionContainer: {
        height: (isiOS ? 34 : 30) * 5 + 6,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 8,
        paddingRight: 8,
    },
    expression: {
        width: ExpressionSize,
        height: isiOS ? 34 : 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

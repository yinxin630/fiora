import { View, Text } from 'native-base';
import React from 'react';
import { TouchableOpacity, Linking, StyleSheet } from 'react-native';
import Expression from '../../components/Expression';
import { Message } from '../../types/redux';
import expressions from '../../utils/expressions';

type Props = {
    message: Message;
    isSelf: boolean;
};

function TextMessage({ message, isSelf }: Props) {
    const children = [];
    let copy = message.content;

    function push(str: string) {
        children.push(
            <Text key={Math.random()} style={{color: isSelf ? 'white' : '#444'}}>
                {str}
            </Text>,
        );
    }

    // 处理文本消息中的表情和链接
    let offset = 0;
    while (copy.length > 0) {
        const regex = /#\(([\u4e00-\u9fa5a-z]+)\)|https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
        const matchResult = regex.exec(copy);
        if (matchResult) {
            const r = matchResult[0];
            const e = matchResult[1];
            const i = copy.indexOf(r);
            if (r[0] === '#') {
                // 表情消息
                const index = expressions.default.indexOf(e);
                if (index !== -1) {
                    // 处理从开头到匹配位置的文本
                    if (i > 0) {
                        push(copy.substring(0, i));
                    }
                    children.push(
                        <Expression
                            key={Math.random()}
                            style={styles.expression}
                            size={30}
                            index={index}
                        />,
                    );
                    offset += i + r.length;
                }
            } else {
                // 链接消息
                if (i > 0) {
                    push(copy.substring(0, i));
                }
                children.push(
                    <TouchableOpacity key={Math.random()} onPress={() => Linking.openURL(r)}>
                        {
                            // Do not nest in view error in dev environment
                            process.env.NODE_ENV === 'development' ? (
                                <View>
                                    <Text style={{ color: '#001be5' }}>{r}</Text>
                                </View>
                            ) : (
                                <Text style={{ color: '#001be5' }}>{r}</Text>
                            )
                        }
                    </TouchableOpacity>,
                );
                offset += i + r.length;
            }
            copy = copy.substr(i + r.length);
        } else {
            break;
        }
    }

    // 处理剩余文本
    if (offset < message.content.length) {
        push(message.content.substring(offset, message.content.length));
    }

    return <View style={[styles.container]}>{children}</View>;
}

export default TextMessage;

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
    },
    text: {
        flexShrink: 1,
    },
    textSelf: {
        color: 'white',
    },
    expression: {
        marginLeft: 1,
        marginRight: 1,
        transform: [
            {
                translateY: 3,
            },
        ],
    },
});

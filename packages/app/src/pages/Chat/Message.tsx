import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Triangle from '@react-native-toolkit/triangle';

import { ActionSheet } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Time from '../../utils/time';
import Avatar from '../../components/Avatar';
import { Message as MessageType } from '../../types/redux';
import SystemMessage from './SystemMessage';
import ImageMessage from './ImageMessage';
import TextMessage from './TextMessage';
import { getRandomColor } from '../../utils/getRandomColor';
import InviteMessage from './InviteMessage';
import {
    useFocus,
    useIsAdmin,
    useSelfId,
    useTheme,
} from '../../hooks/useStore';
import { deleteMessage } from '../../service';
import action from '../../state/action';

const { width: ScreenWidth } = Dimensions.get('window');

type Props = {
    message: MessageType;
    isSelf: boolean;
    shouldScroll: boolean;
    scrollToEnd: () => void;
    openImageViewer: (imageUrl: string) => void;
};

function Message({
    message,
    isSelf,
    shouldScroll,
    scrollToEnd,
    openImageViewer,
}: Props) {
    const { primaryColor8 } = useTheme();
    const isAdmin = useIsAdmin();
    const self = useSelfId();
    const focus = useFocus();

    const couldDelete =
        message.type !== 'system' && (isAdmin || message.from._id === self);

    useEffect(() => {
        if (shouldScroll) {
            scrollToEnd();
        }
    }, []);

    async function handleDeleteMessage() {
        const options = ['撤回', '取消'];
        ActionSheet.show(
            {
                options: ['确定', '取消'],
                cancelButtonIndex: options.findIndex(
                    (option) => option === '取消',
                ),
                title: '是否撤回消息?',
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0: {
                        const isSuccess = await deleteMessage(message._id);
                        if (isSuccess) {
                            action.deleteLinkmanMessage(focus, message._id);
                        }
                        break;
                    }
                    default: {
                        break;
                    }
                }
            },
        );
    }

    function formatTime() {
        const createTime = new Date(message.createTime);
        const nowTime = new Date();
        if (Time.isToday(nowTime, createTime)) {
            return Time.getHourMinute(createTime);
        }
        if (Time.isYesterday(nowTime, createTime)) {
            return `昨天 ${Time.getHourMinute(createTime)}`;
        }
        if (Time.isSameYear(nowTime, createTime)) {
            return `${Time.getMonthDate(createTime)} ${Time.getHourMinute(
                createTime,
            )}`;
        }
        return `${Time.getYearMonthDate(createTime)} ${Time.getHourMinute(
            createTime,
        )}`;
    }

    function handleClickAvatar() {
        Actions.push('userInfo', { user: message.from });
    }

    function renderContent() {
        switch (message.type) {
            case 'text': {
                return <TextMessage message={message} isSelf={isSelf} />;
            }
            case 'image': {
                return (
                    <ImageMessage
                        message={message}
                        openImageViewer={openImageViewer}
                        couldDelete={couldDelete}
                        onLongPress={handleDeleteMessage}
                    />
                );
            }
            case 'system': {
                return <SystemMessage message={message} />;
            }
            case 'inviteV2': {
                return <InviteMessage message={message} isSelf={isSelf} />;
            }
            case 'file':
            case 'code': {
                return (
                    <Text style={{ color: isSelf ? 'white' : '#666' }}>
                        暂未支持的消息类型[
                        {message.type}
                        ], 请在Web端查看
                    </Text>
                );
            }
            default:
                return (
                    <Text style={{ color: isSelf ? 'white' : '#666' }}>
                        不支持的消息类型
                    </Text>
                );
        }
    }

    return (
        <View style={[styles.container, isSelf && styles.containerSelf]}>
            {isSelf ? (
                <Avatar src={message.from.avatar} size={44} />
            ) : (
                <TouchableOpacity onPress={handleClickAvatar}>
                    <Avatar src={message.from.avatar} size={44} />
                </TouchableOpacity>
            )}
            <View style={[styles.info, isSelf && styles.infoSelf]}>
                <View style={[styles.nickTime, isSelf && styles.nickTimeSelf]}>
                    {!!message.from.tag && (
                        <View
                            style={[
                                styles.tag,
                                {
                                    backgroundColor: getRandomColor(
                                        message.from.tag,
                                    ),
                                },
                            ]}
                        >
                            <Text style={styles.tagText}>
                                {message.from.tag}
                            </Text>
                        </View>
                    )}
                    <Text
                        style={[
                            styles.nick,
                            isSelf ? styles.nickSelf : styles.nickOther,
                        ]}
                    >
                        {message.from.username}
                    </Text>
                    <Text style={[styles.time, isSelf && styles.timeSelf]}>
                        {formatTime()}
                    </Text>
                </View>
                {couldDelete ? (
                    <TouchableOpacity onLongPress={handleDeleteMessage}>
                        <View
                            style={[
                                styles.content,
                                {
                                    backgroundColor: isSelf
                                        ? primaryColor8
                                        : 'white',
                                },
                            ]}
                        >
                            {renderContent()}
                        </View>
                    </TouchableOpacity>
                ) : (
                    <View
                        style={[
                            styles.content,
                            {
                                backgroundColor: isSelf
                                    ? primaryColor8
                                    : 'white',
                            },
                        ]}
                    >
                        {renderContent()}
                    </View>
                )}
                <View
                    style={[
                        styles.triangle,
                        isSelf ? styles.triangleSelf : styles.triangleOther,
                    ]}
                >
                    <Triangle
                        type="isosceles"
                        mode={isSelf ? 'right' : 'left'}
                        base={10}
                        height={5}
                        color={isSelf ? primaryColor8 : 'white'}
                    />
                </View>
            </View>
        </View>
    );
}

export default React.memo(Message);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 6,
        paddingLeft: 8,
        paddingRight: 8,
    },
    containerSelf: {
        flexDirection: 'row-reverse',
    },
    info: {
        position: 'relative',
        marginLeft: 8,
        marginRight: 8,
        maxWidth: ScreenWidth - 120,
        alignItems: 'flex-start',
    },
    infoSelf: {
        alignItems: 'flex-end',
    },
    nickTime: {
        flexDirection: 'row',
    },
    nickTimeSelf: {
        flexDirection: 'row-reverse',
    },
    nick: {
        fontSize: 13,
        color: '#333',
    },
    nickSelf: {
        marginRight: 4,
    },
    nickOther: {
        marginLeft: 4,
    },
    time: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
    },
    timeSelf: {
        marginRight: 4,
    },
    content: {
        marginTop: 3,
        borderRadius: 6,
        padding: 5,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: 'white',
        minHeight: 26,
        minWidth: 20,
        marginBottom: 6,
    },
    triangle: {
        position: 'absolute',
        top: 25,
    },
    triangleSelf: {
        right: -5,
    },
    triangleOther: {
        left: -5,
    },
    tag: {
        height: 14,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 3,
        paddingRight: 3,
        borderRadius: 3,
    },
    tagText: {
        fontSize: 11,
        color: 'white',
    },
});

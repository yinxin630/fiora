import { isMobile } from '@fiora/utils/ua';
import getFriendId from '@fiora/utils/getFriendId';
import convertMessage from '@fiora/utils/convertMessage';
import getData from '../localStorage';
import {
    Action,
    ActionTypes,
    SetUserPayload,
    SetStatusPayload,
    AddLinkmanPayload,
    AddLinkmanHistoryMessagesPayload,
    SetLinkmansLastMessagesPayload,
    SetLinkmanPropertyPayload,
    UpdateMessagePayload,
    AddLinkmanMessagePayload,
    UpdateUserInfoPayload,
    DeleteMessagePayload,
} from './action';

/** 聊天消息 */
export interface Message {
    _id: string;
    type: string;
    content: string;
    from: {
        _id: string;
        username: string;
        avatar: string;
        originUsername: string;
        tag: string;
    };
    loading: boolean;
    percent: number;
    createTime: string;
    deleted?: boolean;
}

export interface MessagesMap {
    [messageId: string]: Message;
}

export interface GroupMember {
    user: {
        _id: string;
        username: string;
        avatar: string;
    };
    os: string;
    browser: string;
    environment: string;
}

/** 群组 */
export interface Group {
    _id: string;
    name: string;
    avatar: string;
    createTime: string;
    creator: string;
    onlineMembers: GroupMember[];
}

/** 好友 */
export interface Friend {
    _id: string;
    name: string;
    avatar: string;
    createTime: string;
}

/** 联系人 */
export interface Linkman extends Group, User {
    type: string;
    unread: number;
    messages: MessagesMap;
}

export interface LinkmansMap {
    [linkmanId: string]: Linkman;
}

/** 用户信息 */
export interface User {
    _id: string;
    username: string;
    avatar: string;
    isOnline: boolean;
}

/** redux store state */
export interface State {
    /** 用户信息 */
    user: {
        _id: string;
        username: string;
        avatar: string;
        tag: string;
        isAdmin: boolean;
    } | null;
    linkmans: LinkmansMap;
    /** 聚焦的联系人 */
    focus: string;
    /** 客户端连接状态 */
    connect: boolean;
    /** 客户端的一些状态值 */
    status: {
        ready: boolean;
        /** 是否显示登陆注册框 */
        loginRegisterDialogVisible: boolean;
        /** 主题 */
        theme: string;
        /** 主题主色调 */
        primaryColor: string;
        /** 主题文字主色调 */
        primaryTextColor: string;
        /** 背景图 */
        backgroundImage: string;
        /** 启用毛玻璃效果 */
        aero: boolean;
        /** 新消息声音提示开关 */
        soundSwitch: boolean;
        /** 声音类型 */
        sound: string;
        /** 新消息桌面提醒开关 */
        notificationSwitch: boolean;
        /** 新消息语言朗读开关 */
        voiceSwitch: boolean;
        /** 是否朗读个人发送的消息开关 */
        selfVoiceSwitch: boolean;
        /**
         * 用户标签颜色模式
         * singleColor: 固定颜色
         * fixedColor: 同一词始终同一颜色
         * randomColor: 同一词在每次渲染中保持同一颜色
         */
        tagColorMode: string;
        /** 是否展示侧边栏 */
        sidebarVisible: boolean;
        /** 是否展示搜索+联系人列表栏 */
        functionBarAndLinkmanListVisible: boolean;
        /** enable search expression when input some phrase */
        enableSearchExpression: boolean;
    };
}

/**
 * 将联系人以_id为键转为对象结构
 * @param linkmans 联系人数组
 */
function getLinkmansMap(linkmans: Linkman[]) {
    return linkmans.reduce((map: LinkmansMap, linkman) => {
        map[linkman._id] = linkman;
        return map;
    }, {});
}

/**
 * 将消息以_id为键转为对象结构
 * @param messages 消息数组
 */
function getMessagesMap(messages: Message[]) {
    return messages.reduce((map: MessagesMap, message) => {
        map[message._id] = message;
        return map;
    }, {});
}

/**
 * 删除对象中的对个键值
 * @param obj 目标对象
 * @param keys 要删除的键列表
 */
function deleteObjectKeys<T>(obj: T, keys: string[]): T {
    let entries = Object.entries(obj);
    const keysSet = new Set(keys);
    entries = entries.filter((entry) => !keysSet.has(entry[0]));
    return entries.reduce((result: any, entry) => {
        const [k, v] = entry;
        result[k] = v;
        return result;
    }, {});
}

/**
 * 删除对象中的某个键值
 * 直接调用delete删除键值据说性能差(我没验证)
 * @param obj 目标对象
 * @param key 要删除的键
 */
function deleteObjectKey<T>(obj: T, key: string): T {
    return deleteObjectKeys(obj, [key]);
}

/**
 * 初始化联系人部分公共字段
 * @param linkman 联系人
 * @param type 联系人类型
 */
function initLinkmanFields(linkman: Linkman, type: string) {
    linkman.type = type;
    linkman.unread = 0;
    linkman.messages = {};
}

/**
 * 转换群组数据结构
 * @param group 群组
 */
function transformGroup(group: Linkman): Linkman {
    initLinkmanFields(group, 'group');
    group.creator = group.creator || '';
    group.onlineMembers = [];
    return group;
}

/**
 * 转换好友数据结构
 * @param friend 好友
 */
function transformFriend(friend: Linkman): Linkman {
    // @ts-ignore
    const { from, to } = friend;
    const transformedFriend = {
        _id: getFriendId(from, to._id),
        name: to.username,
        avatar: to.avatar,
        // @ts-ignore
        createTime: friend.createTime,
    };
    initLinkmanFields(transformedFriend as unknown as Linkman, 'friend');
    return transformedFriend as Linkman;
}

function transformTemporary(temporary: Linkman): Linkman {
    initLinkmanFields(temporary, 'temporary');
    return temporary;
}

const localStorage = getData();
export const initialState: State = {
    user: null,
    linkmans: {},
    focus: '',
    connect: false,
    status: {
        ready: false,
        loginRegisterDialogVisible: false,
        theme: localStorage.theme,
        primaryColor: localStorage.primaryColor,
        primaryTextColor: localStorage.primaryTextColor,
        backgroundImage: localStorage.backgroundImage,
        aero: localStorage.aero,
        soundSwitch: localStorage.soundSwitch,
        sound: localStorage.sound,
        notificationSwitch: localStorage.notificationSwitch,
        voiceSwitch: localStorage.voiceSwitch,
        selfVoiceSwitch: localStorage.selfVoiceSwitch,
        tagColorMode: localStorage.tagColorMode,
        sidebarVisible: !isMobile,
        functionBarAndLinkmanListVisible: !isMobile,
        enableSearchExpression: localStorage.enableSearchExpression,
    },
};

function reducer(state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.Ready: {
            return {
                ...state,
                status: {
                    ...state.status,
                    ready: true,
                },
            };
        }
        case ActionTypes.Connect: {
            return {
                ...state,
                connect: true,
            };
        }
        case ActionTypes.Disconnect: {
            return {
                ...state,
                connect: false,
            };
        }

        case ActionTypes.SetGuest: {
            const group = action.payload as Linkman;
            transformGroup(group);
            return {
                ...state,
                user: {
                    _id: '',
                    username: '',
                    avatar: '',
                    tag: '',
                    isAdmin: false,
                },
                linkmans: {
                    [group._id]: group,
                },
                focus: group._id,
            };
        }

        case ActionTypes.SetUser: {
            const { _id, username, avatar, tag, groups, friends, isAdmin } =
                action.payload as SetUserPayload;
            // @ts-ignore
            const linkmans: Linkman[] = [
                // @ts-ignore
                ...groups.map(transformGroup),
                // @ts-ignore
                ...friends.map(transformFriend),
            ];

            // 如果没登录过, 则将聚焦联系人设置为第一个联系人
            let { focus } = state;
            /* istanbul ignore next */
            if (!state.user && linkmans.length > 0) {
                focus = linkmans[0]._id;
            }

            return {
                ...state,
                user: {
                    _id,
                    username,
                    avatar,
                    tag,
                    isAdmin,
                },
                linkmans: getLinkmansMap(linkmans),
                focus,
            };
        }

        case ActionTypes.UpdateUserInfo: {
            const payload = action.payload as UpdateUserInfoPayload;
            return {
                ...state,
                // @ts-ignore
                user: {
                    ...state.user,
                    ...payload,
                },
            };
        }

        case ActionTypes.Logout: {
            return {
                ...initialState,
                status: {
                    ...state.status,
                },
            };
        }

        case ActionTypes.SetAvatar: {
            return {
                ...state,
                // @ts-ignore
                user: {
                    ...state.user,
                    avatar: action.payload as string,
                },
            };
        }

        case ActionTypes.SetFocus: {
            const focus = action.payload as string;
            if (!state.linkmans[focus]) {
                /* istanbul ignore next */
                if (!__TEST__) {
                    console.warn(
                        `ActionTypes.SetFocus Error: 联系人 ${focus} 不存在`,
                    );
                }
                return state;
            }

            /**
             * 为了优化性能
             * 如果目标联系人的旧消息个数超过50条, 仅保留50条
             */
            const { messages } = state.linkmans[focus];
            const messageKeys = Object.keys(messages);
            let reserveMessages = messages;
            if (messageKeys.length > 50) {
                reserveMessages = deleteObjectKeys(
                    messages,
                    messageKeys.slice(0, messageKeys.length - 50),
                );
            }

            return {
                ...state,
                linkmans: {
                    ...state.linkmans,
                    [focus]: {
                        ...state.linkmans[focus],
                        messages: reserveMessages,
                        unread: 0,
                    },
                },
                focus,
            };
        }

        case ActionTypes.AddLinkman: {
            const payload = action.payload as AddLinkmanPayload;
            const { linkman } = payload;
            const focus = payload.focus ? linkman._id : state.focus;

            let transformedLinkman = linkman;
            switch (linkman.type) {
                case 'group': {
                    transformedLinkman = transformGroup(linkman);
                    break;
                }
                case 'friend': {
                    transformedLinkman = transformFriend(linkman);
                    break;
                }
                case 'temporary': {
                    transformedLinkman = transformTemporary(linkman);
                    transformedLinkman.unread = 1;
                    break;
                }
                default: {
                    return state;
                }
            }

            return {
                ...state,
                linkmans: {
                    ...state.linkmans,
                    [transformedLinkman._id]: transformedLinkman,
                },
                focus,
            };
        }

        case ActionTypes.RemoveLinkman: {
            const linkmans = deleteObjectKey(
                state.linkmans,
                action.payload as string,
            );
            const linkmanIds = Object.keys(linkmans);
            const focus = linkmanIds.length > 0 ? linkmanIds[0] : '';
            return {
                ...state,
                linkmans: {
                    ...linkmans,
                },
                focus,
            };
        }

        case ActionTypes.SetLinkmansLastMessages: {
            const linkmansMessages =
                action.payload as SetLinkmansLastMessagesPayload;
            const { linkmans } = state;
            const newState = { ...state, linkmans: {} };
            Object.keys(linkmans).forEach((linkmanId) => {
                // @ts-ignore
                newState.linkmans[linkmanId] = {
                    ...linkmans[linkmanId],
                    ...(linkmansMessages[linkmanId]
                        ? {
                            messages: getMessagesMap(
                                linkmansMessages[linkmanId].messages,
                            ),
                            unread: linkmansMessages[linkmanId].unread,
                        }
                        : {}),
                };
            });
            return newState;
        }

        case ActionTypes.AddLinkmanHistoryMessages: {
            const payload = action.payload as AddLinkmanHistoryMessagesPayload;
            const messagesMap = getMessagesMap(payload.messages);
            return {
                ...state,
                linkmans: {
                    ...state.linkmans,
                    [payload.linkmanId]: {
                        ...state.linkmans[payload.linkmanId],
                        messages: {
                            ...messagesMap,
                            ...state.linkmans[payload.linkmanId].messages,
                        },
                    },
                },
            };
        }

        case ActionTypes.AddLinkmanMessage: {
            const payload = action.payload as AddLinkmanMessagePayload;
            let { unread } = state.linkmans[payload.linkmanId];
            if (state.focus !== payload.linkmanId) {
                unread++;
            }
            return {
                ...state,
                linkmans: {
                    ...state.linkmans,
                    [payload.linkmanId]: {
                        ...state.linkmans[payload.linkmanId],
                        messages: {
                            ...state.linkmans[payload.linkmanId].messages,
                            [payload.message._id]: payload.message,
                        },
                        unread,
                    },
                },
            };
        }

        case ActionTypes.DeleteMessage: {
            const { linkmanId, messageId, shouldDelete } =
                action.payload as DeleteMessagePayload;
            if (!state.linkmans[linkmanId]) {
                /* istanbul ignore next */
                if (!__TEST__) {
                    console.warn(
                        `ActionTypes.DeleteMessage Error: 联系人 ${linkmanId} 不存在`,
                    );
                }
                return state;
            }

            const newMessages = shouldDelete
                ? deleteObjectKey(state.linkmans[linkmanId].messages, messageId)
                : {
                    ...state.linkmans[linkmanId].messages,
                    [messageId]: convertMessage({
                        ...state.linkmans[linkmanId].messages[messageId],
                        deleted: true,
                    }),
                };

            return {
                ...state,
                linkmans: {
                    ...state.linkmans,
                    [linkmanId]: {
                        ...state.linkmans[linkmanId],
                        messages: newMessages,
                    },
                },
            };
        }

        case ActionTypes.SetLinkmanProperty: {
            const payload = action.payload as SetLinkmanPropertyPayload;
            return {
                ...state,
                linkmans: {
                    ...state.linkmans,
                    [payload.linkmanId]: {
                        ...state.linkmans[payload.linkmanId],
                        [payload.key]: payload.value,
                    },
                },
            };
        }

        case ActionTypes.UpdateMessage: {
            const payload = action.payload as UpdateMessagePayload;

            let messages = {};
            if (payload.value._id) {
                messages = {
                    ...deleteObjectKey(
                        state.linkmans[payload.linkmanId].messages,
                        payload.messageId,
                    ),
                    [payload.value._id]: payload.value,
                };
            } else {
                messages = {
                    ...state.linkmans[payload.linkmanId].messages,
                    [payload.messageId]: {
                        ...state.linkmans[payload.linkmanId].messages[
                            payload.messageId
                        ],
                        ...payload.value,
                    },
                };
            }

            return {
                ...state,
                linkmans: {
                    ...state.linkmans,
                    [payload.linkmanId]: {
                        ...state.linkmans[payload.linkmanId],
                        messages,
                    },
                },
            };
        }

        case ActionTypes.SetStatus: {
            const payload = action.payload as SetStatusPayload;
            return {
                ...state,
                status: {
                    ...state.status,
                    [payload.key]: payload.value,
                },
            };
        }

        default:
            return state;
    }
}

export default reducer;

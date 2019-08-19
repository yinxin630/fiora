import { isMobile } from '../../utils/ua';
import getData from '../localStorage';
import {
    Action,
    ActionTypes,
    SetUserPayload,
    SetStatusPayload,
    AddLinkmanPayload,
    AddLinkmanMessagesPayload,
} from './action';

/** 聊天消息 */
export interface Message {
    _id: string;
}

export interface MessagesMap {
    [messageId: string]: Message;
}

/** 群组 */
export interface Group {
    _id: string;
    name: string;
    avatar: string;
    createTime: string;
    creator: string;
    members: {}[];
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
}

/** 声音提醒类型 */
export enum SoundType {}

/** redux store state */
export interface State {
    /** 用户信息 */
    user?: {
        _id: string;
        username: string;
        avatar: string;
        isAdmin: boolean;
    };
    linkmans: LinkmansMap;
    /** 聚焦的联系人 */
    focus: string;
    /** 客户端连接状态 */
    connect: boolean;
    /** 客户端的一些状态值 */
    status: {
        /** 是否显示登陆注册框 */
        loginRegisterDialogVisible: boolean;
        /** 主题主色调 */
        primaryColor: string;
        /** 主题文字主色调 */
        primaryTextColor: string;
        /** 背景图 */
        backgroundImage: string;
        /** 新消息声音提示开关 */
        soundSwitch: boolean;
        /** 声音类型 */
        sound: SoundType;
        /** 新消息桌面提醒开关 */
        notificationSwitch: boolean;
        /** 新消息语言朗读开关 */
        voiceSwitch: boolean;
        /** 是否朗读个人发送的消息开关 */
        selfVoiceSwitch: boolean;
        /** 是否展示侧边栏 */
        sidebarVisible: boolean;
        /** 是否展示搜索+联系人列表栏 */
        functionBarAndLinkmanListVisible: boolean;
    };
}

function getLinkmansMap(linkmans: Linkman[]) {
    return linkmans.reduce((map: LinkmansMap, linkman) => {
        map[linkman._id] = linkman;
        return map;
    }, {});
}

function getMessagesMap(messages: Message[]) {
    return messages.reduce((map: MessagesMap, message) => {
        map[message._id] = message;
        return map;
    }, {});
}

function deleteObjectKey<T>(obj: T, key: string): T {
    let entries = Object.entries(obj);
    entries = entries.filter((entry) => entry[0] !== key);
    return entries.reduce((result: any, entry) => {
        // eslint-disable-next-line prefer-destructuring
        result[entry[0]] = entry[1];
        return result;
    }, {});
}

function initLinkmanFields(linkman: Linkman, type: string) {
    linkman.type = type;
    linkman.unread = 0;
    linkman.messages = {};
}

function transformGroup(group: Linkman): Linkman {
    initLinkmanFields(group, 'group');
    return group;
}

function transformFriend(friend: Linkman): Linkman {
    // @ts-ignore
    const { to } = friend;
    const transformedFriend = {
        _id: to._id,
        name: to.username,
        avatar: to.avatar,
        // @ts-ignore
        createTime: friend.createTime,
    };
    initLinkmanFields(transformedFriend as unknown as Linkman, 'friend');
    return transformedFriend as Linkman;
}

const localStorage = getData();
const initialState: State = {
    user: null,
    linkmans: {},
    focus: '',
    connect: true,
    status: {
        loginRegisterDialogVisible: false,
        primaryColor: localStorage.primaryColor,
        primaryTextColor: localStorage.primaryTextColor,
        backgroundImage: localStorage.backgroundImage,
        soundSwitch: localStorage.soundSwitch,
        sound: (localStorage.sound as unknown) as SoundType,
        notificationSwitch: localStorage.notificationSwitch,
        voiceSwitch: localStorage.voiceSwitch,
        selfVoiceSwitch: localStorage.selfVoiceSwitch,
        sidebarVisible: !isMobile,
        functionBarAndLinkmanListVisible: !isMobile,
    },
};

function reducer(state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.SetGuest: {
            const group = action.payload as Linkman;
            initLinkmanFields(group, 'group');
            return {
                ...state,
                user: {
                    _id: '',
                    username: '',
                    avatar: '',
                    isAdmin: false,
                },
                linkmans: {
                    [group._id]: group,
                },
                focus: group._id,
            };
        }

        case ActionTypes.SetUser: {
            const {
                _id,
                username,
                avatar,
                groups,
                friends,
                isAdmin,
            } = action.payload as SetUserPayload;
            // @ts-ignore
            const linkmans: Linkman[] = [
                ...groups.map(transformGroup),
                ...friends.map(transformFriend),
            ];
            const focus = linkmans.length > 0 ? linkmans[0]._id : '';
            return {
                ...state,
                user: {
                    _id,
                    username,
                    avatar,
                    isAdmin,
                },
                linkmans: getLinkmansMap(linkmans),
                focus,
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
                user: {
                    ...state.user,
                    avatar: action.payload as string,
                },
            };
        }

        case ActionTypes.SetFocus: {
            return {
                ...state,
                focus: action.payload as string,
            };
        }

        case ActionTypes.AddLinkman: {
            const payload = action.payload as AddLinkmanPayload;
            const { linkman } = payload;
            const focus = payload.focus ? linkman._id : state.focus;
            return {
                ...state,
                linkmans: {
                    ...state.linkmans,
                    [linkman._id]: (linkman.type === 'group' ? transformGroup : transformFriend)(linkman),
                },
                focus,
            };
        }

        case ActionTypes.RemoveLinkman: {
            const linkmans = deleteObjectKey(state.linkmans, action.payload as string);
            return {
                ...state,
                ...linkmans,
            };
        }

        case ActionTypes.AddLinkmanMessages: {
            const payload = action.payload as AddLinkmanMessagesPayload;
            const messagesMap = getMessagesMap(payload.messages);
            return {
                ...state,
                linkmans: {
                    ...state.linkmans,
                    [payload.linkmanId]: {
                        ...state.linkmans[payload.linkmanId],
                        messages: {
                            ...state.linkmans[payload.linkmanId].messages,
                            ...messagesMap,
                        },
                    },
                },
            };
        }

        case ActionTypes.SetFriend: {
            const payload = action.payload as string;
            return {
                ...state,
                linkmans: {
                    ...state.linkmans,
                    [payload]: {
                        ...state.linkmans[payload],
                        type: 'friend',
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

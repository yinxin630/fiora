import { isMobile } from '../../utils/ua';
import getData from '../localStorage';
import { Action, ActionTypes, SetUserPayload, SetStatusPayload } from './action';

/** 聊天消息 */
export interface Message {

}

export interface MessagesMap {
    [messageId: string]: Message;
}

/** 群组 */
export interface Group {
    _id: string;
    name: string;
    avatar: string;
    messages: MessagesMap;
}

/** 好友 */
export interface Friend {
    _id: string;
}

/** 联系人 */
export type Linkman = Group | Friend;

export interface LinkmansMap {
    [linkmanId: string]: Linkman;
}

/** 用户信息 */
export interface User {
    _id: string;
    username: string;
    avatar: string;
    isAdmin: boolean;
    linkmans: LinkmansMap;
}

/** 声音提醒类型 */
export enum SoundType {

}

/** redux store state */
export interface State {
    /** 用户信息 */
    user?: User;
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
        featurePanelVisible: boolean;
    }
}

function getLinkmansMap(linkmans: Linkman[]) {
    return linkmans.reduce((map: LinkmansMap, linkman) => {
        map[linkman._id] = linkman;
        return map;
    }, {});
}

const localStorage = getData();
const initialState: State = {
    user: null,
    focus: '',
    connect: true,
    status: {
        loginRegisterDialogVisible: false,
        primaryColor: localStorage.primaryColor,
        primaryTextColor: localStorage.primaryTextColor,
        backgroundImage: localStorage.backgroundImage,
        soundSwitch: localStorage.soundSwitch,
        sound: localStorage.sound as unknown as SoundType,
        notificationSwitch: localStorage.notificationSwitch,
        voiceSwitch: localStorage.voiceSwitch,
        selfVoiceSwitch: localStorage.selfVoiceSwitch,
        sidebarVisible: !isMobile,
        featurePanelVisible: !isMobile,
    },
};

function reducer(state: State = initialState, action: Action): State {
    switch (action.type) {
        case ActionTypes.SetGuest: {
            const group = action.payload as Group;
            return {
                ...state,
                user: {
                    _id: '',
                    username: '',
                    avatar: '',
                    isAdmin: false,
                    linkmans: {
                        [group._id]: group,
                    },
                },
                focus: group._id,
            };
        }

        case ActionTypes.SetUser: {
            const {
                _id, username, avatar, groups, friends, isAdmin,
            } = action.payload as SetUserPayload;
            const linkmans: Linkman[] = [...groups, ...friends];
            const focus = linkmans.length > 0 ? linkmans[0]._id : '';
            return {
                ...state,
                user: {
                    _id,
                    username,
                    avatar,
                    linkmans: getLinkmansMap(linkmans),
                    isAdmin,
                },
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

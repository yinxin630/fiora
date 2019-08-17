import { isMobile } from '../../utils/ua';
import getData from '../localStorage';
import { Action, ActionTypes } from './action';

export interface User {

}

/** 声音提醒类型 */
export enum SoundType {

}

/** redux store state */
export interface State {
    /** 用户信息 */
    user: User;
    /** 聚焦的联系人 */
    focus: '';
    /** 客户端连接状态 */
    connect: boolean;
    /** 客户端的一些状态值 */
    status: {
        /** 是否显示登陆框 */
        showLoginDialog: boolean;
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
        sideInfoVisible: boolean;
        /** 是否展示搜索+联系人列表栏 */
        featurePanelVisible: boolean;
    }
}

const localStorage = getData();
const initialState: State = {
    user: null,
    focus: '',
    connect: true,
    status: {
        showLoginDialog: false,
        primaryColor: localStorage.primaryColor,
        primaryTextColor: localStorage.primaryTextColor,
        backgroundImage: localStorage.backgroundImage,
        soundSwitch: localStorage.soundSwitch,
        sound: localStorage.sound as unknown as SoundType,
        notificationSwitch: localStorage.notificationSwitch,
        voiceSwitch: localStorage.voiceSwitch,
        selfVoiceSwitch: localStorage.selfVoiceSwitch,
        featurePanelVisible: !isMobile,
        sideInfoVisible: !isMobile,
    },
};

function reducer(state: State = initialState, action: Action) {
    switch (action.type) {
        case ActionTypes.SetUser: {
            return state;
        }

        default:
            return state;
    }
}

export default reducer;

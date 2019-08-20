import { Group, Friend, Message, Linkman } from './reducer';

// eslint-disable-next-line import/prefer-default-export
export enum ActionTypes {
    /** 设置游客信息 */
    SetGuest = 'SetGuest',
    /** 设置用户信息 */
    SetUser = 'SetUser',
    /** 更新客户端状态 */
    SetStatus = 'SetStatus',
    /** 退出登录 */
    Logout = 'Logout',
    /** 设置用户头像 */
    SetAvatar = 'SetAvatar',
    /** 添加新联系人 */
    AddLinkman = 'AddLinkman',
    /** 移除指定联系人 */
    RemoveLinkman = 'RemoveLinkman',
    /** 设置聚焦的联系人 */
    SetFocus = 'SetFocus',
    /** 设置各联系人历史消息 */
    SetLinkmansLastMessages = 'SetLinkmansLastMessages',
    /** 添加联系人历史消息 */
    AddLinkmanMessages = 'AddLinkmanMessages',
    /** 将临时联系人类的型修改为好友 */
    SetLinkmanProperty = 'SetLinkmanProperty',
}

export type SetGuestPayload = Group;

export type SetUserPayload = {
    _id: string;
    username: string;
    avatar: string;
    groups: Group[];
    friends: Friend[];
    isAdmin: boolean;
};

export interface SetStatusPayload {
    key: string;
    value: any;
}

export type SetAvatarPayload = string;

export interface AddLinkmanPayload {
    linkman: Linkman;
    focus: boolean;
}

export type SetFocusPayload = string;

export interface SetLinkmansLastMessagesPayload {
    [linkmanId: string]: Message[];
}

export interface AddLinkmanMessagesPayload {
    linkmanId: string;
    messages: Message[];
}

export interface SetLinkmanPropertyPayload {
    linkmanId: string;
    key: string;
    value: any;
}

export type RemoveLinkmanPayload = string;

export interface Action {
    type: ActionTypes;
    payload:
        | SetUserPayload
        | SetGuestPayload
        | SetStatusPayload
        | SetAvatarPayload
        | AddLinkmanPayload
        | SetFocusPayload
        | AddLinkmanMessagesPayload
        | SetLinkmanPropertyPayload
        | RemoveLinkmanPayload
        | SetLinkmansLastMessagesPayload;
}

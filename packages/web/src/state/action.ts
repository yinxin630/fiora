import { Group, Friend, Message, Linkman } from './reducer';

// eslint-disable-next-line import/prefer-default-export
export enum ActionTypes {
    /** 设置游客信息 */
    SetGuest = 'SetGuest',
    /** 设置用户信息 */
    SetUser = 'SetUser',
    /** 更新用户信息 */
    UpdateUserInfo = 'UpdateUserInfo',
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
    AddLinkmanHistoryMessages = 'AddLinkmanHistoryMessages',
    /** 添加联系人新消息 */
    AddLinkmanMessage = 'AddLinkmanMessage',
    /** 设置联系人指定属性值 */
    SetLinkmanProperty = 'SetLinkmanProperty',
    /** 更新消息 */
    UpdateMessage = 'UpdateMessage',
    /** 删除消息 */
    DeleteMessage = 'DeleteMessage',
    /** socket连接成功 */
    Connect = 'Connect',
    /** socket断开连接 */
    Disconnect = 'Disconnect',
    /** Aliyun OSS ready */
    Ready = 'Ready',
}

export type SetGuestPayload = Group;

export type SetUserPayload = {
    _id: string;
    username: string;
    tag: string;
    avatar: string;
    groups: Group[];
    friends: Friend[];
    isAdmin: boolean;
};

export type UpdateUserInfoPayload = Object;

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
    [linkmanId: string]: {
        messages: Message[];
        unread: number;
    };
}

export interface AddLinkmanHistoryMessagesPayload {
    linkmanId: string;
    messages: Message[];
}

export interface AddLinkmanMessagePayload {
    linkmanId: string;
    message: Message;
}

export interface SetLinkmanPropertyPayload {
    linkmanId: string;
    key: string;
    value: any;
}

export type RemoveLinkmanPayload = string;

export interface UpdateMessagePayload {
    linkmanId: string;
    messageId: string;
    value: any;
}

export interface DeleteMessagePayload {
    linkmanId: string;
    messageId: string;
    shouldDelete: boolean;
}

export interface Action {
    type: ActionTypes;
    payload:
        | SetUserPayload
        | UpdateUserInfoPayload
        | SetGuestPayload
        | SetStatusPayload
        | SetAvatarPayload
        | AddLinkmanPayload
        | SetFocusPayload
        | AddLinkmanHistoryMessagesPayload
        | AddLinkmanMessagePayload
        | SetLinkmanPropertyPayload
        | RemoveLinkmanPayload
        | SetLinkmansLastMessagesPayload
        | UpdateMessagePayload
        | DeleteMessagePayload;
}

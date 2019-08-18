import { Group, Friend, Message, Linkman } from './reducer';

// eslint-disable-next-line import/prefer-default-export
export enum ActionTypes {
    SetGuest = 'SetGuest',
    SetUser = 'SetUser',
    SetStatus = 'SetStatus',
    Logout = 'Logout',
    SetAvatar = 'SetAvatar',
    AddLinkman = 'AddLinkman',
    RemoveLinkman = 'RemoveLinkman',
    SetFocus = 'SetFocus',
    AddLinkmanMessages = 'AddLinkmanMessages',
    SetFriend = 'SetFriend',
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

export interface AddLinkmanMessagesPayload {
    linkmanId: string;
    messages: Message[];
}

export type SetFriendPayload = string;

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
        | SetFriendPayload
        | RemoveLinkmanPayload;
}

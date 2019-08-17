import { Group, Friend } from './reducer';

// eslint-disable-next-line import/prefer-default-export
export enum ActionTypes {
    SetGuest = 'SetGuest',
    SetUser = 'SetUser',
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

export interface Action {
    type: ActionTypes;
    payload: SetUserPayload | SetGuestPayload;
}

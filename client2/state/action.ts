import { User } from './reducer';

// eslint-disable-next-line import/prefer-default-export
export enum ActionTypes {
    SetUser = 'SetUser',
}

export type SetUserPayload = User;

export interface Action {
    type: ActionTypes;
    payload: SetUserPayload;
}

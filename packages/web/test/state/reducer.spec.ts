import getFriendId from '@fiora/utils/getFriendId';
import reducer, { State, initialState } from '../../src/state/reducer';
import { Action, ActionTypes } from '../../src/state/action';

describe('redux reducer', () => {
    it('should user initial state', () => {
        const action = { type: 'mock' as ActionTypes, payload: {} } as Action;
        expect(reducer(undefined, action)).toBe(initialState);
    });

    it('should return origin state with unknown action', () => {
        const state = {} as State;
        const action = { type: 'mock' as ActionTypes, payload: {} } as Action;
        expect(reducer(state, action)).toBe(state);
    });

    it('should set connect status to true', () => {
        const state = {
            connect: false,
        } as State;
        const action = {
            type: ActionTypes.Connect,
            payload: {},
        };
        const newState = reducer(state, action);
        expect(newState.connect).toBe(true);
    });

    it('should set connect status to false', () => {
        const state = {
            connect: true,
        } as State;
        const action = {
            type: ActionTypes.Disconnect,
            payload: {},
        };
        const newState = reducer(state, action);
        expect(newState.connect).toBe(false);
    });

    it('should set guest user and default group', () => {
        const state = {} as State;
        const group = {
            _id: '1',
            name: 'Default Group',
        };
        const action = {
            type: ActionTypes.SetGuest,
            payload: group,
        };
        const newState = reducer(state, action);
        expect(newState.user).not.toBe(null);
        expect(newState.linkmans[group._id]).toBe(group);
        expect(newState.focus).toBe(group._id);
    });

    it('should set user and linkmans', () => {
        const state = {
            linkmans: {},
        } as State;
        const group = {
            _id: 'group',
            name: 'group',
        };
        const friend = {
            from: '111',
            to: {
                _id: '222',
                username: 'friend',
            },
        };
        const action = {
            type: ActionTypes.SetUser,
            payload: {
                _id: 'id',
                username: 'user',
                friends: [friend],
                groups: [group],
            },
        };
        const newState = reducer(state, action);
        expect(newState.user).not.toBe(null);
        expect(Object.keys(newState.linkmans).length).toBe(2);
        expect(newState.linkmans[group._id].type).toBe('group');

        const friendId = getFriendId(friend.from, friend.to._id);
        expect(newState.linkmans[friendId].type).toBe('friend');
        expect(newState.linkmans[friendId].name).toBe(friend.to.username);
        expect(newState.focus).toBe(group._id);
    });

    it('should update user with payload data', () => {
        const state = {
            user: {
                _id: 'id',
                username: 'name',
            },
        } as State;
        const action = {
            type: ActionTypes.UpdateUserInfo,
            payload: {
                username: 'new',
            },
        };
        const newState = reducer(state, action);
        expect(newState.user?.username).toBe('new');
    });

    it('should set user to null', () => {
        const state = {
            user: {
                _id: 'id',
            },
        } as State;
        const action = {
            type: ActionTypes.Logout,
            payload: {},
        };
        const newState = reducer(state, action);
        expect(newState.user).toEqual(null);
    });

    it('should update user avatar', () => {
        const state = {
            user: {
                _id: 'id',
                avatar: 'avatar',
            },
        } as State;
        const action = {
            type: ActionTypes.SetAvatar,
            payload: 'new',
        };
        const newState = reducer(state, action);
        expect(newState.user?.avatar).toBe('new');
    });

    it('should update focus and reduce exist messages when more than 50', () => {
        const linkman = {
            _id: '1',
            messages: {},
        };
        const state = {
            linkmans: {
                [linkman._id]: linkman,
            },
            focus: '',
        } as State;
        const action = {
            type: ActionTypes.SetFocus,
            payload: linkman._id,
        };
        const newState = reducer(state, action);
        expect(newState.focus).toBe(linkman._id);
        expect(
            Object.keys(newState.linkmans[newState.focus].messages),
        ).toHaveLength(0);
    });

    it('should reduce exist messages when more than 50', () => {
        const messages: { [id: string]: any } = {};
        for (let i = 0; i < 51; i++) {
            messages[i] = {
                _id: i,
            };
        }
        const linkman = {
            _id: '1',
            messages,
            unread: 10,
        };
        const state = {
            linkmans: {
                [linkman._id]: linkman,
            },
            focus: '',
        } as State;
        const action = {
            type: ActionTypes.SetFocus,
            payload: linkman._id,
        };
        const newState = reducer(state, action);
        expect(
            Object.keys(newState.linkmans[newState.focus].messages),
        ).toHaveLength(50);
    });

    it('should be no change when foucs not exits user id', () => {
        const linkman = {
            id: '1',
        };
        // @ts-ignore
        const state = {
            linkmans: {
                [linkman.id]: linkman,
            },
            focus: linkman.id,
        } as State;
        const action = {
            type: ActionTypes.SetFocus,
            payload: '2',
        };
        const newState = reducer(state, action);
        expect(newState).toBe(state);
    });

    it('should add new group linkman into linkmans', () => {
        const state = {
            linkmans: {},
        } as State;
        const linkman = {
            _id: 'id',
            name: 'name',
            type: 'group',
        };
        const action = {
            type: ActionTypes.AddLinkman,
            payload: {
                linkman,
                focus: true,
            },
        };
        const newState = reducer(state, action);
        expect(Object.keys(newState.linkmans)).toHaveLength(1);
        expect(newState.focus).toBe(linkman._id);
    });

    it('should add new friend linkman into linkmans', () => {
        const state = {
            linkmans: {},
        } as State;
        const linkman = {
            name: 'name',
            type: 'friend',
            from: '111',
            to: {
                _id: '222',
            },
        };
        const action = {
            type: ActionTypes.AddLinkman,
            payload: {
                linkman,
            },
        };
        const newState = reducer(state, action);
        expect(Object.keys(newState.linkmans)).toHaveLength(1);
        expect(newState.linkmans['111222']).toBeTruthy();
    });

    it('should add new temporary linkman into linkmans', () => {
        const state = {
            linkmans: {},
        } as State;
        const linkman = {
            _id: 'id',
            name: 'name',
            type: 'temporary',
        };
        const action = {
            type: ActionTypes.AddLinkman,
            payload: {
                linkman,
            },
        };
        const newState = reducer(state, action);
        expect(Object.keys(newState.linkmans)).toHaveLength(1);
        expect(newState.linkmans[linkman._id].unread).toBe(1);
    });

    it('should return origin state when add unknown linkman', () => {
        const state = {
            linkmans: {},
        } as State;
        const action = {
            type: ActionTypes.AddLinkman,
            payload: {
                linkman: {
                    type: 'xxx',
                },
            },
        };
        const newState = reducer(state, action);
        expect(newState).toBe(state);
    });

    it('should remove linkman form linkmans', () => {
        const linkman1 = {
            _id: '1',
        };
        const linkman2 = {
            _id: '2',
        };
        const state = {
            linkmans: {
                [linkman1._id]: linkman1,
                [linkman2._id]: linkman2,
            },
        } as State;
        const action1 = {
            type: ActionTypes.RemoveLinkman,
            payload: linkman1._id,
        };
        const newState = reducer(state, action1);
        expect(Object.keys(newState.linkmans)).toHaveLength(1);
        expect(newState.focus).toBe(linkman2._id);

        const action2 = {
            type: ActionTypes.RemoveLinkman,
            payload: linkman2._id,
        };
        expect(reducer(newState, action2).focus).toBe('');
    });

    it('should add messages to linkmans', () => {
        const state = {
            linkmans: {
                1: {
                    _id: '1',
                    name: 'name',
                    messages: {},
                },
                2: {
                    _id: '2',
                    name: 'name',
                    messages: {},
                },
            },
        } as unknown as State;
        const action = {
            type: ActionTypes.SetLinkmansLastMessages,
            payload: {
                '1': {
                    messages: [
                        {
                            _id: 'm1',
                            type: 'text',
                            content: 'content',
                        },
                        {
                            _id: 'm2',
                            type: 'text',
                            content: 'content',
                        },
                    ],
                    unread: 2,
                },
            },
        };
        const newState = reducer(state, action);
        expect(Object.keys(newState.linkmans['1'].messages).length).toBe(2);
        expect(Object.keys(newState.linkmans['2'].messages).length).toBe(0);
    });

    it('should add messages to linkman', () => {
        const state = {
            linkmans: {
                1: {
                    _id: '1',
                    name: 'name',
                    messages: {},
                },
            },
        } as unknown as State;
        const action = {
            type: ActionTypes.AddLinkmanHistoryMessages,
            payload: {
                linkmanId: '1',
                messages: [
                    {
                        _id: 'm1',
                        type: 'text',
                        content: 'content',
                    },
                    {
                        _id: 'm2',
                        type: 'text',
                        content: 'content',
                    },
                ],
            },
        };
        const newState = reducer(state, action);
        expect(Object.keys(newState.linkmans['1'].messages).length).toBe(2);
    });

    it('should add message to linkman', () => {
        const linkman = {
            _id: '1',
            name: 'name',
            messages: {},
            unread: 0,
        };
        const state = {
            linkmans: {
                [linkman._id]: linkman,
            },
        } as State;
        const action = {
            type: ActionTypes.AddLinkmanMessage,
            payload: {
                linkmanId: '1',
                message: {
                    _id: 'm1',
                    type: 'text',
                    content: 'content',
                },
            },
        };
        const newState = reducer(state, action);
        expect(Object.keys(newState.linkmans['1'].messages)).toHaveLength(1);
        expect(newState.linkmans['1'].unread).toBe(1);
    });

    it('should not increase unread count when linkman is foucs', () => {
        const linkman = {
            _id: '1',
            name: 'name',
            messages: {},
            unread: 0,
        };
        const state = {
            linkmans: {
                [linkman._id]: linkman,
            },
            focus: linkman._id,
        } as State;
        const action = {
            type: ActionTypes.AddLinkmanMessage,
            payload: {
                linkmanId: '1',
                message: {
                    _id: 'm1',
                    type: 'text',
                    content: 'content',
                },
            },
        };
        const newState = reducer(state, action);
        expect(Object.keys(newState.linkmans['1'].messages)).toHaveLength(1);
        expect(newState.linkmans['1'].unread).toBe(0);
    });

    it('should remove message from linkman', () => {
        const state = {
            linkmans: {
                1: {
                    _id: '1',
                    name: 'name',
                    messages: {
                        m1: {
                            _id: 'm1',
                            type: 'text',
                            content: 'content',
                            from: {},
                        },
                    },
                    unread: 0,
                },
            },
        } as unknown as State;
        const action = {
            type: ActionTypes.DeleteMessage,
            payload: {
                linkmanId: '1',
                messageId: 'm1',
            },
        };
        const newState = reducer(state, action);
        expect(newState.linkmans['1'].messages.m1.deleted).toBe(true);
    });

    it('should return origin state when delete not exists linkman message', () => {
        const state = {
            linkmans: {},
        } as State;
        const action = {
            type: ActionTypes.DeleteMessage,
            payload: {
                linkmanId: '1',
                messageId: 'm1',
            },
        };
        const newState = reducer(state, action);
        expect(newState).toBe(state);
    });

    it('should update linkman property', () => {
        const state = {
            linkmans: {
                1: {
                    _id: '1',
                    name: 'name',
                    messages: {},
                    unread: 0,
                },
            },
        } as unknown as State;
        const action = {
            type: ActionTypes.SetLinkmanProperty,
            payload: {
                linkmanId: '1',
                key: 'name',
                value: 'new_name',
            },
        };
        const newState = reducer(state, action);
        expect(newState.linkmans['1'].name).toBe('new_name');
    });

    it('should update message from linkman', () => {
        const state = {
            linkmans: {
                1: {
                    _id: '1',
                    name: 'name',
                    messages: {
                        m1: {
                            _id: 'm1',
                            type: 'text',
                            content: 'content',
                        },
                    },
                    unread: 0,
                },
            },
        } as unknown as State;
        const action = {
            type: ActionTypes.UpdateMessage,
            payload: {
                linkmanId: '1',
                messageId: 'm1',
                value: {
                    _id: 'm1',
                    type: 'text',
                    content: 'new_content',
                },
            },
        };
        const newState = reducer(state, action);
        expect(newState.linkmans['1'].messages.m1.content).toBe('new_content');
    });

    it('should add instead of update message when it not exists', () => {
        const linkman = {
            _id: '1',
            name: 'name',
            messages: {},
            unread: 0,
        };
        const state = {
            linkmans: {
                [linkman._id]: linkman,
            },
        } as State;
        const action = {
            type: ActionTypes.UpdateMessage,
            payload: {
                linkmanId: linkman._id,
                messageId: 'm1',
                value: {
                    type: 'text',
                    content: 'new_content',
                },
            },
        };
        const newState = reducer(state, action);
        expect(newState.linkmans[linkman._id].messages.m1.content).toBe(
            'new_content',
        );
    });

    it('should update status of key', () => {
        const state = {
            status: {
                aero: false,
            },
        } as unknown as State;
        const action = {
            type: ActionTypes.SetStatus,
            payload: {
                key: 'aero',
                value: true,
            },
        };
        const newState = reducer(state, action);
        expect(newState.status.aero).toBe(true);
    });
});

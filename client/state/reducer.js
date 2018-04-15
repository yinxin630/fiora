import immutable from 'immutable';
import ActionTypes from './ActionTypes';
import setCssVariable from '../../utils/setCssVariable';
import config from '../../config/client';

const primaryColor = window.localStorage.getItem('primaryColor') || config.primaryColor;
const primaryTextColor = window.localStorage.getItem('primaryTextColor') || config.primaryTextColor;
setCssVariable(primaryColor, primaryTextColor);

const backgroundImage = window.localStorage.getItem('backgroundImage') || config.backgroundImage;
const sound = window.localStorage.getItem('sound') || config.sound;

const initialState = immutable.fromJS({
    user: null,
    focusGroup: '',
    connect: true,
    ui: {
        showLoginDialog: false,
        primaryColor,
        primaryTextColor,
        backgroundImage,
        sound,
    },
});


function reducer(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.SetDeepValue: {
        return state.setIn(action.keys, immutable.fromJS(action.value));
    }
    case ActionTypes.SetUser: {
        return state.set('user', immutable.fromJS(action.user)).set('defaultGroup', null);
    }
    case ActionTypes.AddGroup: {
        action.group.unread = 0;
        return state.updateIn(
            ['user', 'groups'],
            groups => groups.unshift(immutable.fromJS(action.group)),
        );
    }
    case ActionTypes.SetGroupMessages: {
        const newGroups = state
            .getIn(['user', 'groups'])
            .map(group => (
                group.set('messages', immutable.fromJS(action.messages[group.get('_id')]))
            ))
            .sort((group1, group2) => {
                const messages1 = group1.get('messages');
                const messages2 = group2.get('messages');
                const time1 = messages1.size > 0 ? messages1.get(messages1.size - 1).get('createTime') : group1.get('createTime');
                const time2 = messages2.size > 0 ? messages2.get(messages2.size - 1).get('createTime') : group2.get('createTime');
                return new Date(time1) < new Date(time2);
            });
        return state
            .setIn(['user', 'groups'], newGroups)
            .set('focusGroup', newGroups.getIn([0, '_id']));
    }
    case ActionTypes.SetGroupMembers: {
        const groupIndex = state
            .getIn(['user', 'groups'])
            .findIndex(group => group.get('_id') === action.groupId);
        return state.setIn(['user', 'groups', groupIndex, 'members'], immutable.fromJS(action.members));
    }
    case ActionTypes.SetGroupAvatar: {
        const groupIndex = state
            .getIn(['user', 'groups'])
            .findIndex(group => group.get('_id') === action.groupId);
        return state.setIn(['user', 'groups', groupIndex, 'avatar'], action.avatar);
    }
    case ActionTypes.AddGroupMessage: {
        const groupIndex = state
            .getIn(['user', 'groups'])
            .findIndex(group => group.get('_id') === action.group);
        const group = state.getIn(['user', 'groups', groupIndex]);
        let unread = 0;
        if (state.get('focusGroup') !== group.get('_id')) {
            unread = group.get('unread') + 1;
        }
        return state
            .updateIn(['user', 'groups'], groups => (
                groups
                    .delete(groupIndex)
                    .unshift(group
                        .update('messages', messages => (
                            messages.push(immutable.fromJS(action.message))
                        ))
                        .set('unread', unread))
            ));
    }
    case ActionTypes.SetFocusGroup: {
        const groupIndex = state
            .getIn(['user', 'groups'])
            .findIndex(group => group.get('_id') === action.groupId);
        return state
            .set('focusGroup', action.groupId)
            .setIn(['user', 'groups', groupIndex, 'unread'], 0);
    }
    case ActionTypes.AddGroupMessages: {
        const groupIndex = state
            .getIn(['user', 'groups'])
            .findIndex(group => group.get('_id') === action.group);
        return state
            .updateIn(['user', 'groups', groupIndex], group => (
                group.update('messages', messages => (
                    immutable.fromJS(action.messages).concat(messages)
                ))
            ));
    }
    case ActionTypes.updateSelfMessage: {
        const groupIndex = state
            .getIn(['user', 'groups'])
            .findIndex(group => group.get('_id') === action.groupId);
        return state.updateIn(['user', 'groups', groupIndex, 'messages'], (messages) => {
            const messageIndex = messages.findLastIndex(m => m.get('_id') === action.messageId);
            return messages.update(messageIndex, message => message.mergeDeep(immutable.fromJS(action.message)));
        });
    }
    case ActionTypes.showLoginDialog: {
        return initialState;
    }
    case ActionTypes.SetAvatar: {
        const userId = state.getIn(['user', '_id']);
        return state
            .setIn(['user', 'avatar'], action.avatar)
            .updateIn(['user', 'groups'], groups => (
                groups.map(group => (
                    group.update('messages', messages => (
                        messages.map((message) => {
                            if (message.getIn(['from', '_id']) === userId) {
                                return message.setIn(['from', 'avatar'], action.avatar);
                            }
                            return message;
                        })
                    ))
                ))
            ));
    }
    default:
        return state;
    }
}

export default reducer;

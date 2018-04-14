import immutable from 'immutable';
import ActionTypes from './ActionTypes';
import setCssVariable from '../../utils/setCssVariable';

const primaryColor = window.localStorage.getItem('primaryColor') || '74, 144, 226';
const primaryTextColor = window.localStorage.getItem('primaryTextColor') || '247, 247, 247';
setCssVariable(primaryColor, primaryTextColor);

const backgroundImage = window.localStorage.getItem('backgroundImage') || require('@/assets/images/background.jpg');

const initialState = immutable.fromJS({
    user: null,
    focusGroup: '',
    connect: true,
    ui: {
        showLoginDialog: false,
        primaryColor,
        primaryTextColor,
        backgroundImage,
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
        return state.updateIn(
            ['user', 'groups'],
            groups => groups.unshift(immutable.fromJS(action.group)),
        );
    }
    case ActionTypes.SetGroupMessages: {
        return state.updateIn(['user', 'groups'], groups => (
            groups.map(group => (
                group.set('messages', immutable.fromJS(action.messages[group.get('_id')]))
            ))
        ));
    }
    case ActionTypes.AddGroupMessage: {
        const groupIndex = state
            .getIn(['user', 'groups'])
            .findIndex(group => group.get('_id') === action.group);
        return state
            .updateIn(['user', 'groups', groupIndex], group => (
                group.update('messages', messages => (
                    messages.push(immutable.fromJS(action.message))
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
    default:
        return state;
    }
}

export default reducer;

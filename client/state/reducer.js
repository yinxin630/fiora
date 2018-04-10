import immutable from 'immutable';
import ActionTypes from './ActionTypes';

const initialState = immutable.fromJS({
    user: null,
    defaultGroup: null,
    focusGroup: '',
    connect: true,
    ui: {
        showLoginDialog: false,
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
    case ActionTypes.SetDefaultGroupMessages: {
        return state.update('defaultGroup', defalutGroup => (
            defalutGroup.set('messages', immutable.fromJS(action.messages))
        ));
    }
    default:
        return state;
    }
}

export default reducer;

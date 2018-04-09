import immutable from 'immutable';
import ActionTypes from './ActionTypes';

const initialState = immutable.fromJS({
    user: null,
    defaultGroup: null,
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
    default:
        return state;
    }
}

export default reducer;

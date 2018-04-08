import immutable from 'immutable';
import ActionTypes from './ActionTypes';

const initialState = immutable.fromJS({
    user: null,
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
    default:
        return state;
    }
}

export default reducer;

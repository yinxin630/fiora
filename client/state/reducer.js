import immutable from 'immutable';
import ActionTypes from './ActionTypes';

const initialState = immutable.fromJS({
    primaryColor: '74, 144, 226',
});

function reducer(state = initialState, action) {
    switch (action.type) {
    case ActionTypes.SetPrimaryColor: {
        return state.set('primaryColor', '189, 16, 224');
    }
    default:
        return state;
    }
}

export default reducer;

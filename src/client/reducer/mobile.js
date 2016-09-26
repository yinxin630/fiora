import immutable from 'immutable';

const initialState = immutable.fromJS({
    shouldScrollMessage: true,
});

function reducer(state = initialState, action) {
    switch (action.type) {
    case 'Initialize': { return initialState; }

    case 'ShouldScrollMessage': { return state.set('shouldScrollMessage', action.should); }

    default:
        return state;
    }
}

export default reducer;

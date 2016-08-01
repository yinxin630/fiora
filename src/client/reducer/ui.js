import R from 'ramda';

function reducer(
    state = {
        showToolbar: false,
    }, 
    action
) {
    switch (action.type) {
        case 'ShowToolbar': {
            let newState = R.clone(state);
            newState.showToolbar = true;
            return newState;
        }
        case 'CloseToolbar': {
            let newState = R.clone(state);
            newState.showToolbar = false;
            return newState;
        }
        default: 
            return state;
    }
}

export default reducer;
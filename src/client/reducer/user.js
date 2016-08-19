import R from 'ramda';

function reducer(
    state = {

    }, 
    action
) {
    switch (action.type) {
        case 'LoginSuccess': {
            let newState = R.clone(state);
            return Object.assign(newState, action.user);
        }

        default: 
            return state;
    }
}

export default reducer;
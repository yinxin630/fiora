import R from 'ramda';

function reducer(
    state = {

    }, 
    action
) {
    switch (action.type) {
        case 'LoginSuccess': {
            let newState = R.clone(state, action.user);
            return newState;
        }

        default: 
            return state;
    }
}

export default reducer;
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
        case 'createGroup': {
            let newState = R.clone(state);
            newState.groups.push(action.data);
            return newState;
        }

        default: 
            return state;
    }
}

export default reducer;
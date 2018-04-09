import store from './store';
import ActionTypes from './ActionTypes';

const { dispatch } = store;

function setUser(user) {
    dispatch({
        type: ActionTypes.SetDeepValue,
        keys: ['user'],
        value: user,
    });
}

function showLoginDialog() {
    dispatch({
        type: ActionTypes.SetDeepValue,
        keys: ['ui', 'showLoginDialog'],
        value: true,
    });
}
function closeLoginDialog() {
    dispatch({
        type: ActionTypes.SetDeepValue,
        keys: ['ui', 'showLoginDialog'],
        value: false,
    });
}

export default {
    setUser,

    showLoginDialog,
    closeLoginDialog,
};

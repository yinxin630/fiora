import store from './store';
import ActionTypes from './ActionTypes';

const { dispatch } = store;

export function setUser(user) {
    dispatch({
        type: ActionTypes.SetDeepValue,
        keys: ['user'],
        value: user,
    });
}

export function showLoginDialog() {
    dispatch({
        type: ActionTypes.SetDeepValue,
        keys: ['ui', 'showLoginDialog'],
        value: true,
    });
}
export function closeLoginDialog() {
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

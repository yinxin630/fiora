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
function connect() {
    dispatch({
        type: ActionTypes.SetDeepValue,
        keys: ['connect'],
        value: true,
    });
}
function disconnect() {
    dispatch({
        type: ActionTypes.SetDeepValue,
        keys: ['connect'],
        value: false,
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
    connect,
    disconnect,

    showLoginDialog,
    closeLoginDialog,
};

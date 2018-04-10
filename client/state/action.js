import store from './store';
import ActionTypes from './ActionTypes';

const { dispatch } = store;

function setUser(user) {
    dispatch({
        type: ActionTypes.SetUser,
        user,
    });
}
function setGuest(defaultGroup) {
    dispatch({
        type: ActionTypes.SetDeepValue,
        keys: ['defaultGroup'],
        value: defaultGroup,
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


function addGroup(group) {
    dispatch({
        type: ActionTypes.AddGroup,
        group,
    });
}
function setFocusGroup(groupId) {
    dispatch({
        type: ActionTypes.SetDeepValue,
        keys: ['focusGroup'],
        value: groupId,
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
    setGuest,
    connect,
    disconnect,

    addGroup,
    setFocusGroup,

    showLoginDialog,
    closeLoginDialog,
};

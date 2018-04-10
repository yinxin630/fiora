import store from './store';
import ActionTypes from './ActionTypes';
import socket from '../socket';

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


function getGroupsLastMessages() {
    const state = store.getState();
    const groupIds = state.getIn(['user', 'groups']).map(group => group.get('_id'));

    socket.emit('getGroupsLastMessages', { groups: groupIds.toJS() }, (res) => {
        dispatch({
            type: ActionTypes.SetGroupMessages,
            messages: res,
        });
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

    getGroupsLastMessages,

    showLoginDialog,
    closeLoginDialog,
};

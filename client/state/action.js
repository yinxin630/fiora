import Message from '@/components/Message';
import store from './store';
import ActionTypes from './ActionTypes';
import socket from '../socket';

const { dispatch } = store;

/* ===== 用户 ===== */
function setUser(user) {
    dispatch({
        type: ActionTypes.SetUser,
        user,
    });
}
function setGuest(defaultGroup) {
    dispatch({
        type: ActionTypes.SetDeepValue,
        keys: ['user'],
        value: { groups: [defaultGroup] },
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

/* ===== 消息 ===== */
function getGroupsLastMessages() {
    const state = store.getState();
    const groupIds = state.getIn(['user', 'groups']).map(group => group.get('_id'));

    socket.emit('getGroupsLastMessages', { groups: groupIds.toJS() }, (res) => {
        if (typeof res === 'string') {
            Message.error(res);
            return;
        }
        dispatch({
            type: ActionTypes.SetGroupMessages,
            messages: res,
        });
    });
}
function getDefaultGroupMessages() {
    socket.emit('getDefalutGroupMessages', { }, (res) => {
        if (typeof res === 'string') {
            Message.error(res);
            return;
        }
        const state = store.getState();
        const defaultGroupId = state.getIn(['user', 'groups', 0, '_id']);
        dispatch({
            type: ActionTypes.SetGroupMessages,
            messages: {
                [defaultGroupId]: res,
            },
        });
    });
}
function addGroupMessage(group, message) {
    dispatch({
        type: ActionTypes.AddGroupMessage,
        group,
        message,
    });
}
function updateSelfMessage(groupId, messageId, message) {
    dispatch({
        type: ActionTypes.updateSelfMessage,
        groupId,
        messageId,
        message,
    });
}

/* ===== 群组 ===== */
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

/* ===== UI ===== */
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
function setPrimaryColor(color) {
    dispatch({
        type: ActionTypes.SetDeepValue,
        keys: ['ui', 'primaryColor'],
        value: color,
    });
}
function setPrimaryTextColor(color) {
    dispatch({
        type: ActionTypes.SetDeepValue,
        keys: ['ui', 'primaryTextColor'],
        value: color,
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
    getDefaultGroupMessages,
    addGroupMessage,
    updateSelfMessage,

    showLoginDialog,
    closeLoginDialog,
    setPrimaryColor,
    setPrimaryTextColor,
};

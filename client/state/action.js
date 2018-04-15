import Message from '@/components/Message';
import store from './store';
import ActionTypes from './ActionTypes';
import socket from '../socket';

const { dispatch } = store;

/* ===== 用户 ===== */
function setUser(user) {
    user.groups.forEach((group) => {
        group.unread = 0;
    });
    dispatch({
        type: ActionTypes.SetUser,
        user,
    });
}
function setGuest(defaultGroup) {
    defaultGroup.unread = 0;
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
function logout() {
    dispatch({
        type: ActionTypes.Logout,
    });
}
function setAvatar(avatar) {
    dispatch({
        type: ActionTypes.SetAvatar,
        avatar,
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
function addGroupMessages(group, messages) {
    dispatch({
        type: ActionTypes.AddGroupMessages,
        group,
        messages,
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
        type: ActionTypes.SetFocusGroup,
        groupId,
    });
}
function setGroupMembers(groupId, members) {
    dispatch({
        type: ActionTypes.SetGroupMembers,
        groupId,
        members,
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
    window.localStorage.setItem('primaryColor', color);
}
function setPrimaryTextColor(color) {
    dispatch({
        type: ActionTypes.SetDeepValue,
        keys: ['ui', 'primaryTextColor'],
        value: color,
    });
    window.localStorage.setItem('primaryTextColor', color);
}
function setBackgroundImage(image) {
    dispatch({
        type: ActionTypes.SetDeepValue,
        keys: ['ui', 'backgroundImage'],
        value: image,
    });
    window.localStorage.setItem('backgroundImage', image);
}
function setSound(sound) {
    dispatch({
        type: ActionTypes.SetDeepValue,
        keys: ['ui', 'sound'],
        value: sound,
    });
    window.localStorage.setItem('sound', sound);
}


export default {
    setUser,
    setGuest,
    connect,
    disconnect,
    logout,
    setAvatar,

    addGroup,
    setFocusGroup,
    setGroupMembers,

    getGroupsLastMessages,
    getDefaultGroupMessages,
    addGroupMessage,
    addGroupMessages,
    updateSelfMessage,

    showLoginDialog,
    closeLoginDialog,
    setPrimaryColor,
    setPrimaryTextColor,
    setBackgroundImage,
    setSound,
};

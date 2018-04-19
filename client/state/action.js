import fetch from 'utils/fetch';
import store from './store';
import ActionTypes from './ActionTypes';

const getFriendId = require('utils/getFriendId');

const { dispatch } = store;

/* ===== 用户 ===== */
async function setUser(user) {
    user.groups.forEach((group) => {
        Object.assign(group, {
            type: 'group',
            unread: 0,
            messages: [],
            members: [],
        });
    });
    user.friends.forEach((friend) => {
        Object.assign(friend, {
            type: 'friend',
            _id: getFriendId(friend.from, friend.to._id),
            messages: [],
            unread: 0,
            avatar: friend.to.avatar,
            name: friend.to.username,
            to: friend.to._id,
        });
    });

    const linkmans = [...user.groups, ...user.friends];
    dispatch({
        type: ActionTypes.SetUser,
        user: {
            _id: user._id,
            avatar: user.avatar,
            username: user.username,
            linkmans,
        },
    });

    connect();

    const [groupMessageResult, friendsMessageResult] = await Promise.all([
        fetch('getGroupsLastMessages', { groups: user.groups.map(g => g._id) }),
        fetch('getFriendsLastMessages', { users: user.friends.map(f => f.to) }),
    ]);
    const messages = Object.assign({}, groupMessageResult[1], friendsMessageResult[1]);
    dispatch({
        type: 'SetLinkmanMessages',
        messages,
    });
}
async function setGuest(defaultGroup) {
    dispatch({
        type: ActionTypes.SetDeepValue,
        keys: ['user'],
        value: { linkmans: [
            Object.assign(defaultGroup, {
                type: 'group',
                unread: 0,
                messages: [],
                members: [],
            }),
        ] },
    });

    const [, messages = []] = await fetch('getDefalutGroupMessages');
    dispatch({
        type: 'SetLinkmanMessages',
        messages: {
            [defaultGroup._id]: messages,
        },
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
        type: 'SetAvatar',
        avatar,
    });
}

function addLinkmanMessage(linkmanId, message) {
    dispatch({
        type: 'AddLinkmanMessage',
        linkmanId,
        message,
    });
}
function addLinkmanMessages(linkmanId, messages) {
    dispatch({
        type: 'AddLinkmanMessages',
        linkmanId,
        messages,
    });
}
function updateSelfMessage(linkmanId, messageId, message) {
    dispatch({
        type: 'UpdateSelfMessage',
        linkmanId,
        messageId,
        message,
    });
}

/* ===== 联系人 ===== */
function setFocus(linkmanId) {
    dispatch({
        type: 'SetFocus',
        linkmanId,
    });
}
function setGroupMembers(groupId, members) {
    dispatch({
        type: 'SetGroupMembers',
        groupId,
        members,
    });
}
function setGroupAvatar(groupId, avatar) {
    dispatch({
        type: 'SetGroupAvatar',
        groupId,
        avatar,
    });
}
function addLinkman(linkman, focus = false) {
    if (linkman.type === 'group') {
        linkman.members = [];
        linkman.messages = [];
        linkman.unread = 0;
    }
    dispatch({
        type: 'AddLinkman',
        linkman,
        focus,
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

    setFocus,
    setGroupMembers,
    setGroupAvatar,
    addLinkman,

    addLinkmanMessage,
    addLinkmanMessages,
    updateSelfMessage,

    showLoginDialog,
    closeLoginDialog,
    setPrimaryColor,
    setPrimaryTextColor,
    setBackgroundImage,
    setSound,
};

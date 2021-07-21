import getFriendId from '../utils/getFriendId';
import store from './store';
import {
    ConnectActionType,
    ConnectAction,
    Friend,
    SetUserActionType,
    SetUserAction,
    SetLinkmanMessagesAction,
    SetGuestActionType,
    SetGuestAction,
    LogoutActionType,
    UpdateUserPropertyActionType,
    UpdateUserPropertyAction,
    AddlinkmanMessageActionType,
    AddlinkmanMessageAction,
    AddLinkmanHistoryMessagesActionType,
    AddLinkmanHistoryMessagesAction,
    UpdateSelfMessageActionType,
    UpdateSelfMessageAction,
    SetFocusAction,
    AddLinkmanAction,
    RemoveLinkmanActionType,
    RemoveLinkmanAction,
    SetFriendAction,
    UpdateUIPropertyActionType,
    UpdateUIPropertyAction,
    Group,
    Message,
    Linkman,
    UpdateGroupPropertyActionType,
    UpdateGroupPropertyAction,
    UpdateFriendPropertyActionType,
    UpdateFriendPropertyAction,
    DeleteLinkmanMessageAction,
    DeleteLinkmanMessageActionType,
} from '../types/redux';

const { dispatch } = store;

function connect() {
    dispatch({
        type: ConnectActionType,
        value: true,
    } as ConnectAction);
}
function disconnect() {
    dispatch({
        type: ConnectActionType,
        value: false,
    } as ConnectAction);
}

function setUser(user: any) {
    user.groups.forEach((group: Group) => {
        Object.assign(group, {
            type: 'group',
            unread: 0,
            messages: [],
            members: [],
        });
    });
    user.friends.forEach((friend: Friend) => {
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
        type: SetUserActionType,
        user: {
            ...user,
            groups: null,
            friends: null,
        },
        linkmans,
    } as SetUserAction);
}
function setLinkmansLastMessages(linkmans: SetLinkmanMessagesAction['linkmans']) {
    dispatch({
        type: 'SetLinkmanMessages',
        linkmans,
    } as SetLinkmanMessagesAction);
}
function setGuest(defaultGroup: Group) {
    dispatch({
        type: SetGuestActionType,
        linkmans: [
            Object.assign(defaultGroup, {
                type: 'group',
                unread: 0,
                members: [],
            }),
        ],
    } as SetGuestAction);
}
function logout() {
    dispatch({
        type: LogoutActionType,
    });
}
function setAvatar(avatar: string) {
    dispatch({
        type: UpdateUserPropertyActionType,
        key: 'avatar',
        value: avatar,
    } as UpdateUserPropertyAction);
}
function updateUserProperty(key: string, value: any) {
    dispatch({
        type: UpdateUserPropertyActionType,
        key,
        value,
    } as UpdateUserPropertyAction);
}

function addLinkmanMessage(linkmanId: string, message: Message) {
    dispatch({
        type: AddlinkmanMessageActionType,
        linkmanId,
        message,
    } as AddlinkmanMessageAction);
}

function deleteLinkmanMessage(linkmanId: string, messageId: string) {
    dispatch({
        type: DeleteLinkmanMessageActionType,
        linkmanId,
        messageId,
    } as DeleteLinkmanMessageAction);
}

function addLinkmanHistoryMessages(linkmanId: string, messages: Message[]) {
    dispatch({
        type: AddLinkmanHistoryMessagesActionType,
        linkmanId,
        messages,
    } as AddLinkmanHistoryMessagesAction);
}
function updateSelfMessage(linkmanId: string, messageId: string, message: Message) {
    dispatch({
        type: UpdateSelfMessageActionType,
        linkmanId,
        messageId,
        message,
    } as UpdateSelfMessageAction);
}

function setFocus(linkmanId: string) {
    dispatch({
        type: 'SetFocus',
        linkmanId,
    } as SetFocusAction);
}
function setGroupMembers(groupId: string, members: Group['members']) {
    dispatch({
        type: UpdateGroupPropertyActionType,
        groupId,
        key: 'members',
        value: members,
    } as UpdateGroupPropertyAction);
}
function setGroupAvatar(groupId: string, avatar: string) {
    dispatch({
        type: UpdateGroupPropertyActionType,
        groupId,
        key: 'avatar',
        value: avatar,
    } as UpdateGroupPropertyAction);
}
function updateGroupProperty(groupId: string, key: string, value: any) {
    dispatch({
        type: UpdateGroupPropertyActionType,
        groupId,
        key,
        value,
    } as UpdateGroupPropertyAction);
}
function updateFriendProperty(userId: string, key: string, value: any) {
    dispatch({
        type: UpdateFriendPropertyActionType,
        userId,
        key,
        value,
    } as UpdateFriendPropertyAction);
}
function addLinkman(linkman: Linkman, focus = false) {
    if (linkman.type === 'group') {
        linkman.members = [];
        linkman.messages = [];
        linkman.unread = 0;
    }
    dispatch({
        type: 'AddLinkman',
        linkman,
        focus,
    } as AddLinkmanAction);
}
function removeLinkman(linkmanId: string) {
    dispatch({
        type: RemoveLinkmanActionType,
        linkmanId,
    } as RemoveLinkmanAction);
}
function setFriend(linkmanId: string, from: Friend['from'], to: Friend['to']) {
    dispatch({
        type: 'SetFriend',
        linkmanId,
        from,
        to,
    } as SetFriendAction);
}

function loading(text: string) {
    dispatch({
        type: UpdateUIPropertyActionType,
        key: 'loading',
        value: text,
    } as UpdateUIPropertyAction);
}

export default {
    setUser,
    setGuest,
    connect,
    disconnect,
    logout,
    setAvatar,
    updateUserProperty,
    setLinkmansLastMessages,

    setFocus,
    setGroupMembers,
    setGroupAvatar,
    addLinkman,
    removeLinkman,
    setFriend,
    updateGroupProperty,
    updateFriendProperty,

    addLinkmanMessage,
    addLinkmanHistoryMessages,
    updateSelfMessage,
    deleteLinkmanMessage,

    loading,
};

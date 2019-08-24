import IO from 'socket.io-client';
import platform from 'platform';

import config from '../config/client';
import store from './state/store';
import { guest, getDefalutGroupHistoryMessages, loginByToken, getLinkmansLastMessages, getLinkmanHistoryMessages } from './service';
import { ActionTypes, SetLinkmanPropertyPayload, AddLinkmanMessagesPayload } from './state/action';
import convertMessage from '../utils/convertMessage';
import getFriendId from '../utils/getFriendId';
import notification from '../utils/notification';
import playSound from '../utils/playSound';
import { Message, Linkman } from './state/reducer';
import voice from '../utils/voice';

const { dispatch } = store;

const options = {
    // reconnectionDelay: 1000,
};
const socket = new IO(config.server, options);

async function loginFailback() {
    const defaultGroup = await guest(platform.os.family, platform.name, platform.description);
    if (defaultGroup) {
        dispatch({
            type: ActionTypes.SetGuest,
            payload: defaultGroup,
        });
        const messages = await getDefalutGroupHistoryMessages(0);
        messages.forEach(convertMessage);
        dispatch({
            type: ActionTypes.AddLinkmanMessages,
            payload: {
                linkmanId: defaultGroup._id,
                messages,
            },
        });
    }
}

socket.on('connect', async () => {
    dispatch({ type: ActionTypes.Connect, payload: null });

    const token = window.localStorage.getItem('token');
    if (token) {
        const user = await loginByToken(
            token,
            platform.os.family,
            platform.name,
            platform.description,
        );
        if (user) {
            dispatch({
                type: ActionTypes.SetUser,
                payload: user,
            });
            const linkmanIds = [
                ...user.groups.map((group) => group._id),
                ...user.friends.map((friend) => getFriendId(friend.from, friend.to._id)),
            ];
            const linkmanMessages = await getLinkmansLastMessages(linkmanIds);
            Object.values(linkmanMessages).forEach(
                (messages: Message[]) => messages.forEach(convertMessage),
            );
            dispatch({
                type: ActionTypes.SetLinkmansLastMessages,
                payload: linkmanMessages,
            });
            return null;
        }
    }
    loginFailback();
    return null;
});

socket.on('disconnect', () => {
    dispatch({ type: ActionTypes.Disconnect, payload: null });
});

let windowStatus = 'focus';
window.onfocus = () => { windowStatus = 'focus'; };
window.onblur = () => { windowStatus = 'blur'; };

let prevFrom = '';
let prevName = '';
socket.on('message', async (message) => {
    convertMessage(message);

    const state = store.getState();
    const isSelfMessage = message.from._id === state.user._id;
    const linkman = state.linkmans[message.to];
    let title = '';
    if (linkman) {
        dispatch({
            type: ActionTypes.AddLinkmanMessages,
            payload: {
                linkmanId: message.to,
                messages: [message],
            } as AddLinkmanMessagesPayload,
        });
        if (linkman.type === 'group') {
            title = `${message.from.username} 在 ${linkman.name} 对大家说:`;
        } else {
            title = `${message.from.username} 对你说:`;
        }
    } else {
        // 联系人不存在并且是自己发的消息, 不创建新联系人
        if (isSelfMessage) {
            return;
        }
        const newLinkman = {
            _id: getFriendId(state.user._id, message.from._id),
            type: 'temporary',
            createTime: Date.now(),
            avatar: message.from.avatar,
            name: message.from.username,
            messages: [],
            unread: 1,
        };
        dispatch({
            type: ActionTypes.AddLinkman,
            payload: {
                linkman: newLinkman as unknown as Linkman,
                focus: false,
            },
        });
        title = `${message.from.username} 对你说:`;

        const messages = await getLinkmanHistoryMessages(newLinkman._id, 0);
        if (messages) {
            dispatch({
                type: ActionTypes.AddLinkmanMessages,
                payload: {
                    linkmanId: newLinkman._id,
                    messages,
                } as AddLinkmanMessagesPayload,
            });
        }
    }

    if (windowStatus === 'blur' && state.status.notificationSwitch) {
        notification(
            title,
            message.from.avatar,
            message.type === 'text' ? message.content.replace(/&lt;/g, '<').replace(/&gt;/g, '>') : `[${message.type}]`,
            Math.random().toString(),
        );
    }

    if (state.status.soundSwitch) {
        const soundType = state.status.sound;
        playSound(soundType);
    }

    if (state.status.voiceSwitch) {
        if (message.type === 'text') {
            const text = message.content
                .replace(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g, '')
                .replace(/#/g, '');

            if (text.length > 100) {
                return;
            }

            const from = linkman && linkman.type === 'group'
                ? `${message.from.username}${linkman.name === prevName ? '' : `在${linkman.name}`}说`
                : `${message.from.username}对你说`;
            if (text) {
                voice.push(from !== prevFrom ? from + text : text, message.from.username);
            }
            prevFrom = from;
            prevName = message.from.username;
        } else if (message.type === 'system') {
            voice.push(message.from.originUsername + message.content, null);
            prevFrom = null;
        }
    }
});

socket.on('changeGroupName', ({ groupId, name }) => {
    dispatch({
        type: ActionTypes.SetLinkmanProperty,
        payload: {
            linkmanId: groupId,
            key: 'name',
            value: name,
        } as SetLinkmanPropertyPayload,
    });
});

socket.on('deleteGroup', ({ groupId }) => {
    dispatch({
        type: ActionTypes.RemoveLinkman,
        payload: groupId,
    });
});

export default socket;

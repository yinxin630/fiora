import IO from 'socket.io-client';
import Toast from './components/Toast';
import action from './state/action';
import store from './state/store';
import {
    AddLinkmanAction,
    AddLinkmanActionType,
    AddLinkmanHistoryMessagesAction,
    AddLinkmanHistoryMessagesActionType,
    AddlinkmanMessageAction,
    AddlinkmanMessageActionType,
    ConnectAction,
    ConnectActionType,
    DeleteLinkmanMessageAction,
    DeleteLinkmanMessageActionType,
    Friend,
    Group,
    Message,
    RemoveLinkmanAction,
    RemoveLinkmanActionType,
    SetGuestAction,
    SetGuestActionType,
    State,
    Temporary,
    UpdateGroupPropertyAction,
    UpdateGroupPropertyActionType,
    UpdateUserPropertyAction,
    UpdateUserPropertyActionType,
    User,
} from './types/redux';
import getFriendId from './utils/getFriendId';
import platform from './utils/platform';
import { getStorageValue } from './utils/storage';

const { dispatch } = store;

const options = {
    transports: ['websocket'],
};

const host = 'http://10.132.67.127:9200';
const socket = IO(host, options);

function fetch<T = any>(
    event: string,
    data: any = {},
    { toast = true } = {},
): Promise<[string | null, T | null]> {
    return new Promise((resolve) => {
        socket.emit(event, data, (res: any) => {
            if (typeof res === 'string') {
                if (toast) {
                    Toast.danger(res);
                }
                resolve([res, null]);
            } else {
                resolve([null, res]);
            }
        });
    });
}

async function guest() {
    const [err, res] = await fetch('guest', {});
    if (!err) {
        dispatch({
            type: SetGuestActionType,
            linkmans: [res],
        } as SetGuestAction);
    }
}

socket.on('connect', async () => {
    dispatch({
        type: ConnectActionType,
        value: true,
    } as ConnectAction);

    const token = await getStorageValue('token');

    if (token) {
        const [err, res] = await fetch(
            'loginByToken',
            {
                token,
                ...platform,
            },
            { toast: false },
        );
        if (err) {
            guest();
        } else {
            const user = res;
            action.setUser(user);

            const linkmanIds = [
                ...user.groups.map((g: Group) => g._id),
                ...user.friends.map((f: Friend) => f._id),
            ];
            const [err2, linkmans] = await fetch('getLinkmansLastMessagesV2', {
                linkmans: linkmanIds,
            });
            if (!err2) {
                action.setLinkmansLastMessages(linkmans);
            }
        }
    } else {
        guest();
    }
});
socket.on('disconnect', () => {
    dispatch({
        type: ConnectActionType,
        value: false,
    } as ConnectAction);
});
socket.on('message', (message: Message) => {
    const state = store.getState() as State;
    const linkman = state.linkmans.find((x) => x._id === message.to);
    if (linkman) {
        dispatch({
            type: AddlinkmanMessageActionType,
            linkmanId: message.to,
            message,
        } as AddlinkmanMessageAction);
    } else {
        const newLinkman: Temporary = {
            _id: getFriendId((state.user as User)._id, message.from._id),
            type: 'temporary',
            createTime: Date.now(),
            avatar: message.from.avatar,
            name: message.from.username,
            messages: [],
            unread: 1,
        };
        dispatch({
            type: AddLinkmanActionType,
            linkman: newLinkman,
            focus: false,
        } as AddLinkmanAction);

        fetch('getLinkmanHistoryMessages', {
            linkmanId: newLinkman._id,
            existCount: 0,
        }).then(([err, res]) => {
            if (!err) {
                dispatch({
                    type: AddLinkmanHistoryMessagesActionType,
                    linkmanId: newLinkman._id,
                    messages: res,
                } as AddLinkmanHistoryMessagesAction);
            }
        });
    }
});

socket.on(
    'changeGroupName',
    ({ groupId, name }: { groupId: string; name: string }) => {
        dispatch({
            type: UpdateGroupPropertyActionType,
            groupId,
            key: 'name',
            value: name,
        } as UpdateGroupPropertyAction);
    },
);

socket.on('deleteGroup', ({ groupId }: { groupId: string }) => {
    dispatch({
        type: RemoveLinkmanActionType,
        linkmanId: groupId,
    } as RemoveLinkmanAction);
});

socket.on('changeTag', (tag: string) => {
    dispatch({
        type: UpdateUserPropertyActionType,
        key: 'tag',
        value: tag,
    } as UpdateUserPropertyAction);
});

socket.on(
    'deleteMessage',
    ({ linkmanId, messageId }: { linkmanId: string; messageId: string }) => {
        dispatch({
            type: DeleteLinkmanMessageActionType,
            linkmanId,
            messageId,
        } as DeleteLinkmanMessageAction);
    },
);

socket.connect();

export default socket;

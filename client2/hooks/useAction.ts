import { useDispatch } from 'react-redux';
import { User, Linkman, Message } from '../state/reducer';
import { ActionTypes } from '../state/action';

/**
 * 获取 redux action
 */
export default function useAction() {
    const dispatch = useDispatch();

    return {
        setUser(user: User) {
            dispatch({
                type: ActionTypes.SetUser,
                payload: user,
            });
        },

        logout() {
            dispatch({
                type: ActionTypes.Logout,
            });
        },

        setAvatar(avatar: string) {
            dispatch({
                type: ActionTypes.SetAvatar,
                payload: avatar,
            });
        },

        setFocus(linkmanId: string) {
            dispatch({
                type: ActionTypes.SetFocus,
                payload: linkmanId,
            });
        },

        addLinkman(linkman: Linkman, focus = false) {
            dispatch({
                type: ActionTypes.AddLinkman,
                payload: {
                    linkman,
                    focus,
                },
            });
        },

        removeLinkman(linkmanId) {
            dispatch({
                type: ActionTypes.RemoveLinkman,
                payload: linkmanId,
            });
        },

        addLinkmanMessages(linkmanId: string, messages: Message[]) {
            dispatch({
                type: ActionTypes.AddLinkmanMessages,
                payload: {
                    linkmanId,
                    messages,
                },
            });
        },

        SetLinkmanProperty(linkmanId: string, key: string, value: any) {
            dispatch({
                type: ActionTypes.SetLinkmanProperty,
                payload: {
                    linkmanId,
                    key,
                    value,
                },
            });
        },

        setStatus(key: string, value: any) {
            dispatch({
                type: ActionTypes.SetStatus,
                payload: {
                    key,
                    value,
                },
            });
            window.localStorage.setItem(key, value);
        },

        toggleLoginRegisterDialog(visible) {
            dispatch({
                type: ActionTypes.SetStatus,
                payload: {
                    key: 'loginRegisterDialogVisible',
                    value: visible,
                },
            });
        },
    };
}

import { useDispatch } from 'react-redux';
import { User } from '../state/reducer';
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

import { useDispatch } from 'react-redux';
import { User } from '../state/reducer';
import { ActionTypes } from '../state/action';

export default function useAction() {
    const dispatch = useDispatch();

    return {
        setUser(user: User) {
            dispatch({
                type: ActionTypes.SetUser,
                payload: user,
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

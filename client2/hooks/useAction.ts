import { useDispatch } from 'react-redux';
import { User } from '../state/reducer';
import { ActionTypes } from '../state/action';

export default function useAction() {
    const dispatch = useDispatch();

    function setUser(user: User) {
        dispatch({
            type: ActionTypes.SetUser,
            payload: user,
        });
    }

    return {
        setUser,
    };
}

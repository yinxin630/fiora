import { useSelector } from 'react-redux';
import { State, Linkman } from '../state/reducer';

export function useStore() {
    return useSelector((state: State) => state);
}

export function useFocusLinkman(): Linkman | null {
    const store = useStore();
    const { focus } = store;
    if (focus) {
        return store.linkmans?.[focus];
    }
    return null;
}

export function useSelfId() {
    const store = useStore();
    return store.user?._id || '';
}

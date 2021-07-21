import { useSelector } from 'react-redux';
import { State, User } from '../types/redux';

export function useStore() {
    return useSelector((state: State) => state);
}

export function useUser() {
    return useStore().user as User;
}

export function useSelfId() {
    const user = useUser();
    return (user && user._id) || '';
}

export function useIsLogin() {
    return !!useSelfId();
}

export function useIsAdmin() {
    const user = useUser();
    return (user && user.isAdmin) || false;
}

export function useTheme() {
    const { ui } = useStore();
    const { primaryColor, primaryTextColor } = ui;
    return {
        primaryColor8: `rgba(${primaryColor}, 0.8)`,
        primaryColor10: `rgba(${primaryColor}, 1)`,
        primaryTextColor10: `rgba(${primaryTextColor}, 1)`,
    };
}

export function useLinkmans() {
    const data = useStore();
    return data.linkmans || [];
}

export function useFocusLinkman() {
    const data = useStore();
    const { linkmans, focus = '' } = data;
    if (linkmans) {
        return linkmans.find((linkman) => linkman._id === focus);
    }
    return null;
}

export function useFocus() {
    const data = useStore();
    return data.focus || '';
}
